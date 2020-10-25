# pylint: disable=redefined-outer-name
import os
import tempfile

import pytest
import requests
import requests_mock

from friday.storage import (
    is_url,
    extract_url_filename,
    get_file_extension,
    is_sub_path,
    rmdirs,
    unique_path,
    download_url,
)
from friday.storage import LocalStorage


@pytest.mark.parametrize(
    "url,valid",
    (
        ("http://google.com", True),
        ("https://github.com", True),
        ("ftp://my-server.com", False),
        ("ftps://my-server.com", False),
        ("blah-blah-blah", False),
    ),
)
def test_is_url(url, valid):
    assert is_url(url) == valid


@pytest.mark.parametrize(
    "url,filename",
    (
        ("https://google.com/a/index.html", "index.html"),
        ("blah-blah-blah", None),
        ("https://google.com/a/index.html?q=123", "index.html"),
    ),
)
def test_extract_url_filename(url, filename):
    assert extract_url_filename(url) == filename


@pytest.mark.parametrize(
    "filename,name,ext",
    (
        ("hello-world.txt", "hello-world", ".txt"),
        ("hello-world", "hello-world", ""),
        ("hello-world.tar.gz", "hello-world", ".tar.gz"),
        ("hello-world.txt.zip", "hello-world.txt", ".zip"),
    ),
)
def test_get_file_extension(filename, name, ext):
    assert get_file_extension(filename) == (name, ext)


@pytest.mark.parametrize(
    "path_a,path_b,valid",
    (
        ("/a/b/c/data.txt", "/a/b", True),
        ("/a/b/c/data.txt", "/a/b/c", True),
        ("/a/b/c/data.txt", "/x/y/z", False),
        ("/a/b", "/a/b", False),
    ),
)
def test_is_sub_path(path_a, path_b, valid):
    assert is_sub_path(path_a, path_b) == valid


@pytest.fixture
def tmpdir():
    with tempfile.TemporaryDirectory() as td:
        yield td


def test_rmdirs(tmpdir):
    path1 = os.path.join(tmpdir, "hello")
    path2 = os.path.join(path1, "world")
    os.makedirs(path2)
    rmdirs(path2, tmpdir)
    assert not os.path.exists(path1)
    assert not os.path.exists(path2)
    assert os.path.exists(tmpdir)


def test_rmdirs2(tmpdir):
    path1 = os.path.join(tmpdir, "hello")
    path2 = os.path.join(path1, "world")
    os.makedirs(path2)
    rmdirs(path1, tmpdir)
    assert os.path.exists(path1)
    assert os.path.exists(path2)
    assert os.path.exists(tmpdir)


def test_rmdirs_not_empty(tmpdir):
    path1 = os.path.join(tmpdir, "hello")
    path2 = os.path.join(path1, "world")
    os.makedirs(path2)
    filename = os.path.join(path2, "data.txt")
    with open(filename, "w") as f:
        f.write("hello")
    rmdirs(path2, tmpdir)
    assert os.path.exists(path1)
    assert os.path.exists(path2)
    assert os.path.exists(tmpdir)


def test_rmdirs_not_empty2(tmpdir):
    path1 = os.path.join(tmpdir, "hello")
    path2 = os.path.join(path1, "world")
    os.makedirs(path2)
    filename = os.path.join(path1, "data.txt")
    with open(filename, "w") as f:
        f.write("hello")
    rmdirs(path2, tmpdir)
    assert os.path.exists(path1)
    assert not os.path.exists(path2)
    assert os.path.exists(tmpdir)


def test_unique_path(tmpdir):
    filename = os.path.join(tmpdir, "data.txt")
    with open(filename, "w") as f:
        f.write("hello")
    another_filename = os.path.join(tmpdir, "hello.txt")
    result = unique_path(another_filename)
    expected = another_filename
    assert result == expected


def test_unique_path2(tmpdir):
    filename = os.path.join(tmpdir, "data.txt")
    with open(filename, "w") as f:
        f.write("hello")
    result = unique_path(filename)
    expected = os.path.join(tmpdir, "data_1.txt")
    assert result == expected


def test_unique_path3(tmpdir):
    filename = os.path.join(tmpdir, "data.txt")
    with open(filename, "w") as f:
        f.write("hello")
    filename2 = os.path.join(tmpdir, "data_1.txt")
    with open(filename2, "w") as f:
        f.write("world")
    result = unique_path(filename)
    expected = os.path.join(tmpdir, "data_2.txt")
    assert result == expected


def test_download_url():
    with requests_mock.mock() as m:
        url = "http://test.com/data.txt"
        data = "data"
        m.get(url, text=data)
        with tempfile.NamedTemporaryFile() as file:
            download_url(url, file)
            file.seek(0)
            content = file.read()
            assert content.decode("utf-8") == data


def test_download_url_404():
    with requests_mock.mock() as m:
        url = "http://test.com/data.txt"
        m.get(url, status_code=404)
        with tempfile.NamedTemporaryFile() as file:
            with pytest.raises(requests.HTTPError):
                download_url(url, file)


def test_local_storage_put(tmpdir):
    storage = LocalStorage(tmpdir)
    with tempfile.NamedTemporaryFile() as file:
        file.write("data".encode("utf-8"))
        file.seek(0)
        storage.put("files/file.txt", file)
    dirpath = os.path.join(tmpdir, "files")
    assert os.path.exists(dirpath)
    assert os.path.isdir(dirpath)
    filepath = os.path.join(dirpath, "file.txt")
    assert os.path.exists(filepath)
    assert os.path.isfile(filepath)


def test_local_storage_get(tmpdir):
    storage = LocalStorage(tmpdir)
    with tempfile.NamedTemporaryFile() as file:
        file.write("data".encode("utf-8"))
        file.seek(0)
        storage.put("files/file.txt", file)
    with storage.get("files/file.txt") as file:
        content = file.read()
        assert content.decode("utf-8") == "data"


def test_local_storage_delete(tmpdir):
    storage = LocalStorage(tmpdir)
    with tempfile.NamedTemporaryFile() as file:
        file.write("data".encode("utf-8"))
        file.seek(0)
        storage.put("files/file.txt", file)
    storage.delete("files/file.txt")
    dirpath = os.path.join(tmpdir, "files")
    assert not os.path.exists(dirpath)
    filepath = os.path.join(dirpath, "file.txt")
    assert not os.path.exists(filepath)


def test_local_storage_delete2(tmpdir):
    storage = LocalStorage(tmpdir)
    with tempfile.NamedTemporaryFile() as file:
        file.write("data".encode("utf-8"))
        file.seek(0)
        storage.put("files/file.txt", file)
        file.seek(0)
        storage.put("files/file2.txt", file)
    storage.delete("files/file2.txt")
    dirpath = os.path.join(tmpdir, "files")
    assert os.path.isdir(dirpath)
    assert os.path.exists(dirpath)
    filepath = os.path.join(dirpath, "file.txt")
    assert os.path.exists(filepath)
    assert os.path.isfile(filepath)
