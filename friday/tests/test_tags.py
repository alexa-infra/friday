import pytest
from friday.models import Doc as DocModel
from friday.models import Tag as TagModel
from friday.models.doc import DocTag
from .common import assertCountEqual


@pytest.mark.usefixtures("app")
def test_tags1():
    obj = DocModel.create(name="test", text="asdf", tagsList=["tag1", "tag2"])
    objects = DocModel.query_list().all()
    assert len(objects) == 1
    obj = DocModel.query_list().first()
    assert obj.name == "test"
    assert obj.text == "asdf"
    expected = ["tag1", "tag2"]
    assertCountEqual(obj.tagsList, expected)


@pytest.mark.usefixtures("app")
def test_tags2():
    DocModel.create(name="test1", text="asdf", tagsList=["tag1", "tag2"])
    DocModel.create(name="test2", text="asdf", tagsList=["tag2", "tag3"])
    tags = TagModel.query.all()
    assert len(tags) == 3


@pytest.mark.usefixtures("app")
def test_tags3():
    obj = DocModel.create(name="test1", text="asdf", tagsList=["tag1", "tag2"])
    obj.update(tagsList=["tag2", "tag3"])
    obj = DocModel.query_list().first()
    expected = ["tag2", "tag3"]
    assertCountEqual(obj.tagsList, expected)
    tags = TagModel.query.all()
    assert len(tags) == 3


@pytest.mark.usefixtures("app")
def test_tags4():
    obj = DocModel.create(name="test1", text="asdf", tagsList=["tag1", "tag2"])

    tag = TagModel.query.filter(TagModel.name == "tag2").first()
    tag.delete()

    obj = DocModel.query_list().first()
    expected = ["tag1"]
    assertCountEqual(obj.tagsList, expected)


@pytest.mark.usefixtures("app")
def test_tags5():
    obj = DocModel.create(name="test1", text="asdf", tagsList=["tag1", "tag2"])

    cc = DocTag.query.count()
    assert cc == 2

    obj.delete()

    tags = TagModel.query.all()
    tagNames = [tag.name for tag in tags]
    expected = ["tag1", "tag2"]
    assertCountEqual(tagNames, expected)

    cc = DocTag.query.count()
    assert cc == 0


@pytest.mark.usefixtures("app")
def test_tags6():
    obj = DocModel.create(name="test1", text="asdf", tagsList=["tag1", "tag2"])

    cc = DocTag.query.count()
    assert cc == 2

    obj.update(tagsList=["tag1", "tag2", "tag1", "tag2"])

    cc = DocTag.query.count()
    assert cc == 2


@pytest.mark.usefixtures("app")
def test_tags_cloud():
    DocModel.create(name="test1", text="asdf", tagsList=["tag1", "tag2"])
    DocModel.create(name="test1", text="asdf", tagsList=["tag2", "tag3"])
    DocModel.create(name="test1", text="asdf", tagsList=["tag2", "tag3", "tag4"])

    cc = DocTag.query.count()
    assert cc == 7

    cc = TagModel.query.count()
    assert cc == 4

    cloud = DocModel.tag_cloud()
    expected = (
        (1, "tag1"),
        (3, "tag2"),
        (2, "tag3"),
        (1, "tag4"),
    )
    assertCountEqual(cloud, expected)
