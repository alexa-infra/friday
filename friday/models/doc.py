from sqlalchemy import Table, Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from slugify import slugify
from markdown import Markdown
from friday.utils import utcnow
from . import db


md = Markdown(extensions=['markdown.extensions.tables'])


DocTag = Table('doc_tag', db.metadata,
    Column('tag_id', Integer, ForeignKey('tag.id'), primary_key=True),
    Column('doc_id', Integer, ForeignKey('doc.id'), primary_key=True)
)


class Tag(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False, unique=True)
    docs = relationship('Doc', back_populates='tags',
                        secondary=DocTag)

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


class Doc(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    text = Column(Text, nullable=True)
    created = Column(DateTime, nullable=False, default=utcnow)
    updated = Column(DateTime, nullable=False, default=utcnow,
                     onupdate=utcnow)
    tags = relationship('Tag', back_populates='docs',
                        secondary=DocTag)

    @property
    def html(self):
        if not self.text:
            return ''
        return md.convert(self.text.decode('utf-8'))

    @classmethod
    def query_list(cls):
        return (
            cls.query.options(db.defer(Doc.text),
                              db.joinedload(Doc.tags))
        )

    @classmethod
    def new(cls, **kwargs):
        tags = kwargs.pop('tagsList', None)
        obj = cls(**kwargs)
        if isinstance(tags, (list, set)):
            obj.setTags(tags)
        return obj

    def update(self, **kwargs):
        tags = kwargs.pop('tagsList', None)
        if isinstance(tags, (list, set)):
            self.setTags(tags)
        for k, v in kwargs.items():
            setattr(self, k, v)

    @property
    def tagsList(self):
        return [tag.name for tag in self.tags]

    def setTags(self, tags):
        current = set(self.tagsList)
        new = set(slugify(tag) for tag in tags)
        to_delete = current - new
        to_create = new - current
        for d in to_delete:
            it = next(tag for tag in self.tags if tag.name == d)
            self.tags.remove(it)
        for d in to_create:
            tag = Tag.query.filter(Tag.name == d).first()
            if not tag:
                tag = Tag(name=d)
                db.session.add(tag)
            self.tags.append(tag)
