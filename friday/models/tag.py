from slugify import slugify
from sqlalchemy import Column, Integer, Text
from sqlalchemy.ext.hybrid import hybrid_property

from .base import Model


class Tag(Model):
    id = Column(Integer, primary_key=True)
    _name = Column("name", Text, nullable=False, unique=True)

    @hybrid_property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        self._name = slugify(value)

    @staticmethod
    def setTags(item, tags):
        current = set(tag.name for tag in item.tags)
        new = set(slugify(tag) for tag in tags)
        to_delete = current - new
        to_create = new - current
        for d in to_delete:
            it = next(tag for tag in item.tags if tag.name == d)
            item.tags.remove(it)
        for d in to_create:
            tag = Tag.query.filter(Tag.name == d).first()
            if not tag:
                tag = Tag.create(name=d)
            item.tags.append(tag)


class TagMixin:  # pylint: disable=too-few-public-methods
    @property
    def tagsList(self):
        return [tag.name for tag in self.tags]

    @tagsList.setter
    def tagsList(self, value):
        if isinstance(value, (list, set)):
            Tag.setTags(self, value)
