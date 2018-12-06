from sqlalchemy import Column, Integer, Text
from slugify import slugify
from . import db


class Tag(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False, unique=True)

    @classmethod
    def new(cls, name, **kwargs):
        name = slugify(name)
        obj = cls(**kwargs, name=name)
        return obj

    def update(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)
        if 'name' in kwargs:
            self.name = slugify(self.name)

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
                tag = Tag(name=d)
                db.session.add(tag)
            item.tags.append(tag)
