from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from slugify import slugify
from markdown import Markdown
from friday.utils import utcnow
from . import db


md = Markdown(extensions=['markdown.extensions.tables'])


class Tag(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False, unique=True)
    docs = relationship('DocTag', back_populates='tag',
                        cascade='all, delete-orphan',
                        passive_deletes=True)

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


class DocTag(db.Model):
    # pylint: disable=too-few-public-methods
    tag_id = Column(Integer, ForeignKey('tag.id', ondelete='cascade'),
                    primary_key=True)
    doc_id = Column(Integer, ForeignKey('doc.id', ondelete='cascade'),
                    primary_key=True)
    tag = relationship('Tag', back_populates='docs', uselist=False,
                       passive_deletes=True)
    doc = relationship('Doc', back_populates='tags', uselist=False,
                       passive_deletes=True)

    @property
    def name(self):
        return self.tag.name


class Doc(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    text = Column(Text, nullable=True)
    created = Column(DateTime, nullable=False, default=utcnow)
    updated = Column(DateTime, nullable=False, default=utcnow,
                     onupdate=utcnow)
    tags = relationship('DocTag', back_populates='doc',
                        cascade='all, delete-orphan',
                        passive_deletes=True)

    @property
    def html(self):
        if not self.text:
            return ''
        return md.convert(self.text.decode('utf-8'))

    @classmethod
    def query_list(cls):
        return (
            cls.query.options(db.defer(Doc.text),
                              db.joinedload(Doc.tags).joinedload(DocTag.tag))
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
            doc_tag = DocTag(doc=self, tag=tag)
            db.session.add(doc_tag)
