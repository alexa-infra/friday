import errno
import os
import re
import shutil
import sys
import tempfile
import uuid
from urllib.parse import urlparse

import requests
from flask import send_file, url_for
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

URL_REGEXP = re.compile(r"^(http|https)://")


def is_url(path):
    return bool(re.match(URL_REGEXP, path))


def extract_url_filename(path):
    url = urlparse(path)
    if not url.netloc or not url.path:
        return None
    return os.path.basename(url.path)


def get_file_extension(filename):
    root, ext = os.path.splitext(filename)
    if ext in [".gz", ".bz2"]:
        root, ext2 = os.path.splitext(root)
        return root, ext2 + ext
    return root, ext


def is_sub_path(path, base_path):
    paths = [path, base_path]
    if path <= base_path:
        return False
    return os.path.commonpath(paths) == base_path


def rmdirs(path, base_path):
    if not os.path.isdir(path):
        path = os.path.dirname(path)
    while is_sub_path(path, base_path):
        try:
            os.rmdir(path)
        except OSError:
            exp = sys.exc_info()[1]
            if exp.errno == errno.ENOTEMPTY:
                break
            raise exp
        path = os.path.dirname(path)


def unique_path(path):
    if not os.path.exists(path):
        return path
    base_path, filename = os.path.split(path)
    name, ext = get_file_extension(filename)
    idx = 1
    while True:
        newfilename = "{}_{}{}".format(name, idx, ext)
        newpath = os.path.join(base_path, newfilename)
        if not os.path.exists(newpath):
            return newpath
        idx += 1


def relpath(path1, path2):
    dirname, _ = os.path.split(path1)
    _, filename = os.path.split(path2)
    return os.path.join(dirname, filename)


def download_url(url, file):
    r = requests.get(url, stream=True)
    r.raise_for_status()
    for chunk in r.iter_content():
        file.write(chunk)


class StorageError(Exception):
    pass


class LocalStorage:
    def __init__(self, path):
        self.base_path = path

        if not os.path.isdir(self.base_path):
            raise StorageError("Base path is not a directory")
        self.base_path = self.base_path.rstrip("/")

    def exists(self, path):
        try:
            self.get_path(path, raise_error=True)
            return True
        except StorageError:
            return False

    def get_path(self, path, raise_error=False):
        path = os.path.join(self.base_path, path)
        if raise_error and not os.path.exists(path):
            raise StorageError("Path not found {}".format(path))
        if raise_error and not os.path.isfile(path):
            raise StorageError("Not a file {}".format(path))
        return path

    def get(self, path):
        path = self.get_path(path, raise_error=True)
        return open(path, "rb")

    def delete(self, path):
        path = self.get_path(path, raise_error=True)
        try:
            os.remove(path)
        except OSError:
            return False
        rmdirs(path, self.base_path)
        return True

    def put(self, path, fo, overwrite=False):
        initial_path = path
        path = self.get_path(path, raise_error=False)
        if os.path.exists(path):
            if not overwrite:
                path = unique_path(path)
        else:
            dirpath = os.path.dirname(path)
            os.makedirs(dirpath, exist_ok=True)
        with open(path, "wb") as f:
            shutil.copyfileobj(fo, f)
        return relpath(initial_path, path)

    def delete_dir(self, path):
        path = os.path.join(self.base_path, path)
        if not os.path.exists(path):
            raise StorageError("Path not exists {}".format(path))
        if not os.path.isdir(path):
            raise StorageError("Not a directory {}".format(path))
        shutil.rmtree(path, ignore_errors=True)
        rmdirs(path, self.base_path)


class Storage:
    def __init__(self, app=None):
        self.storage = None
        if app:
            self.init_app(app)

    def init_app(self, app):
        path = app.config.get("STORAGE_PATH", None)
        if not path:
            raise ValueError("'STORAGE_PATH' is missing")
        app.extensions["storage"] = self
        self.storage = LocalStorage(path)
        self._register_static_route(app)
        return self

    def _register_static_route(self, app):
        @app.route("/storage/<path:filename>", endpoint="storage")
        def storage_file(filename):  # pylint: disable=unused-variable
            try:
                filename = self.storage.get_path(filename)
            except StorageError:
                return "Not found", 404
            return send_file(filename, conditional=True)

    def upload(self, path, file, name=None, overwrite=False):
        if not name:
            if isinstance(file, str) and is_url(file):
                name = extract_url_filename(file)

            if isinstance(file, FileStorage):
                name = file.filename

            if not name:
                name = uuid.uuid4().hex
        name = secure_filename(name)

        with tempfile.SpooledTemporaryFile() as tmp_file:
            if isinstance(file, str) and is_url(file):
                download_url(file, tmp_file)
                file = tmp_file
                file.seek(0)

            if isinstance(file, FileStorage):
                file = file.stream

            path = os.path.join(path, name)
            return self.storage.put(path, file, overwrite)

    def get_url(self, filename, external=False):
        if not self.storage.exists(filename):
            return None
        return url_for("storage", filename=filename, _external=external)

    def __getattr__(self, name):
        return getattr(self.storage, name)
