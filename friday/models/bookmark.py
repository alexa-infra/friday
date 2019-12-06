from urllib.parse import urlparse
from sqlalchemy import Column, Integer, Text, DateTime, Boolean
from sqlalchemy.orm import validates
from slugify import slugify
from friday.utils import utcnow
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

    @validates("url")
    def set_domain(self, _key, value):
        parsed = urlparse(value)
        netloc = str(parsed.netloc)
        if netloc.startswith("www."):
            self.domain = netloc[4:]
        else:
            self.domain = netloc
        return value

    @validates("title", "domain")
    def set_slug(self, key, value):
        if key == "title":
            values = (value, self.domain)
        else:
            values = (self.title, value)
        values = filter(None, values)
        txt = " ".join(values)
        self.slug = slugify(txt, separator=" ")
        return value
