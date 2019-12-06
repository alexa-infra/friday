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


def test_is_url():
    assert is_url("http://google.com")
    assert is_url("https://github.com")
    assert not is_url("ftp://my-server.com")
    assert not is_url("ftps://my-server.com")
    assert not is_url("blah-blah-blah")


def test_extract_url_filename():
    result = extract_url_filename("https://google.com/a/index.html")
    expected = "index.html"
    assert result == expected


def test_extract_url_filename_incorrect():
    result = extract_url_filename("blah-blah-blah")
    expected = None
    assert result == expected


def test_extract_url_filename_query():
    result = extract_url_filename("https://google.com/a/index.html?q=123")
    expected = "index.html"
    assert result == expected


def test_get_file_extension():
    result = get_file_extension("hello-world.txt")
    expected = ("hello-world", ".txt")
    assert result == expected


def test_get_file_extension_noext():
    result = get_file_extension("hello-world")
    expected = ("hello-world", "")
    assert result == expected


def test_get_file_extension_tar_gz():
    result = get_file_extension("hello-world.tar.gz")
    expected = ("hello-world", ".tar.gz")
    assert result == expected


def test_get_file_extension_double_ext():
    result = get_file_extension("hello-world.txt.zip")
    expected = ("hello-world.txt", ".zip")
    assert result == expected


def test_is_sub_path():
    assert is_sub_path("/a/b/c/data.txt", "/a/b")
    assert is_sub_path("/a/b/c/data.txt", "/a/b/c")
    assert not is_sub_path("/a/b/c/data.txt", "/x/y/z")
    assert not is_sub_path("/a/b", "/a/b")


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
