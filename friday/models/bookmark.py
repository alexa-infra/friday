from sqlalchemy import Boolean, Column, DateTime, Integer, Text, ForeignKey, func
from sqlalchemy.orm import validates, joinedload, relationship

from friday.utils import get_domain, get_slug, utcnow

from .base import db, Model
from .tag import Tag, TagMixin


class BookmarkTag(Model):
    tag_id = Column(Integer, ForeignKey("tag.id"), primary_key=True)
    bookmark_id = Column(Integer, ForeignKey("bookmark.id"), primary_key=True)


class Bookmark(Model, TagMixin):
    id = Column(Integer, primary_key=True)
    url = Column(Text, nullable=False)
    title = Column(Text, nullable=False)
    created = Column(DateTime, nullable=False, default=utcnow)
    updated = Column(DateTime, nullable=False, default=utcnow, onupdate=utcnow)
    readed = Column(Boolean, nullable=False, default=False)
    slug = Column(Text)
    domain = Column(Text)
    favorite = Column(Boolean, default=False)
    tags = relationship("Tag", secondary=BookmarkTag.__table__)

    @validates("url")
    def set_domain(self, _key, value):
        self.domain = get_domain(value)
        return value

    @validates("title", "domain")
    def set_slug(self, key, value):
        if key == "title":
            values = (value, self.domain)
        else:
            values = (self.title, value)
        self.slug = get_slug(*values)
        return value

    @classmethod
    def query_list(cls):
        query = cls.query.options(joinedload(Bookmark.tags))
        query = query.order_by(Bookmark.updated.desc())
        return query

    @classmethod
    def tag_cloud(cls):
        query = db.query(func.count("*").label("count"), Tag.name)
        query = query.select_from(BookmarkTag)
        query = query.join(Tag)
        query = query.group_by(Tag.id)
        return query.all()
