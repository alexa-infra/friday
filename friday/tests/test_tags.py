import pytest
import unittest

from friday import make_app
from friday.models import db
from friday.models import Doc as DocModel
from friday.models import Tag as TagModel
from friday.models.doc import DocTag


settings = {
    'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:',
    'SQLALCHEMY_ECHO': False,
}


@pytest.fixture
def app():
    the_app = make_app(settings)
    with the_app.app_context():
        db.create_all()
        db.session.commit()
        yield the_app


def assertCountEqual(x, y):
    case = unittest.TestCase()
    case.assertCountEqual(x, y)


def test_tags1(app):
    obj = DocModel.new(name='test', text='asdf', tagsList=['tag1', 'tag2'])
    db.session.add(obj)
    db.session.commit()
    objects = DocModel.query_list().all()
    assert len(objects) == 1
    obj = DocModel.query_list().first()
    assert obj.name == 'test'
    assert obj.text == 'asdf'
    expected = ['tag1', 'tag2']
    assertCountEqual(obj.tagsList, expected)


def test_tags2(app):
    obj1 = DocModel.new(name='test1', text='asdf', tagsList=['tag1', 'tag2'])
    obj2 = DocModel.new(name='test2', text='asdf', tagsList=['tag2', 'tag3'])
    db.session.add(obj1)
    db.session.add(obj2)
    db.session.commit()
    tags = TagModel.query.all()
    assert len(tags) == 3


def test_tags3(app):
    obj = DocModel.new(name='test1', text='asdf', tagsList=['tag1', 'tag2'])
    db.session.add(obj)
    db.session.commit()
    obj.update(tagsList=['tag2', 'tag3'])
    db.session.add(obj)
    db.session.commit()
    obj = DocModel.query_list().first()
    expected = ['tag2', 'tag3']
    assertCountEqual(obj.tagsList, expected)
    tags = TagModel.query.all()
    assert len(tags) == 3


def test_tags4(app):
    obj = DocModel.new(name='test1', text='asdf', tagsList=['tag1', 'tag2'])
    db.session.add(obj)
    db.session.commit()

    tag = TagModel.query.filter(TagModel.name=='tag2').first()
    db.session.delete(tag)
    db.session.commit()

    obj = DocModel.query_list().first()
    expected = ['tag1']
    assertCountEqual(obj.tagsList, expected)


def test_tags5(app):
    obj = DocModel.new(name='test1', text='asdf', tagsList=['tag1', 'tag2'])
    db.session.add(obj)
    db.session.commit()

    cc = db.session.query(DocTag).count()
    assert cc == 2

    db.session.delete(obj)
    db.session.commit()

    tags = TagModel.query.all()
    tagNames = [tag.name for tag in tags]
    expected = ['tag1', 'tag2']
    assertCountEqual(tagNames, expected)

    cc = db.session.query(DocTag).count()
    assert cc == 0


def test_tags6(app):
    obj = DocModel.new(name='test1', text='asdf', tagsList=['tag1', 'tag2'])
    db.session.add(obj)
    db.session.commit()

    cc = db.session.query(DocTag).count()
    assert cc == 2

    obj.update(tagsList=['tag1', 'tag2', 'tag1', 'tag2'])
    db.session.commit()

    cc = db.session.query(DocTag).count()
    assert cc == 2
