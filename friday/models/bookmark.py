from sqlalchemy import Boolean, Column, DateTime, Integer, Text
from sqlalchemy.orm import validates

from friday.utils import get_domain, get_slug, utcnow

from .base import Model


class Bookmark(Model):
    id = Column(Integer, primary_key=True)
    url = Column(Text, nullable=False)
    title = Column(Text, nullable=False)
    created = Column(DateTime, nullable=False, default=utcnow)
    updated = Column(DateTime, nullable=False, default=utcnow, onupdate=utcnow)
    readed = Column(Boolean, nullable=False, default=False)
    slug = Column(Text)
    domain = Column(Text)
    favorite = Column(Boolean, default=False)

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
