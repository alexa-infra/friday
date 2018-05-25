from urllib.parse import urlparse
from sqlalchemy import Column, Integer, Text, DateTime, Boolean
from slugify import slugify
from friday.utils import utcnow
from . import db


class Bookmark(db.Model):
    id = Column(Integer, primary_key=True)
    url = Column(Text, nullable=False)
    title = Column(Text, nullable=False)
    created = Column(DateTime, nullable=False, default=utcnow)
    updated = Column(DateTime, nullable=False, default=utcnow,
                     onupdate=utcnow)
    readed = Column(Boolean, nullable=False, default=False)
    slug = Column(Text)
    domain = Column(Text)

    @classmethod
    def new(cls, **kwargs):
        obj = cls(**kwargs)
        obj.update_slug()
        obj.update_domain()
        return obj

    @property
    def _slug(self):
        txt = ' '.join(filter(None, [
            self.title,
            self._domain,
        ]))
        return slugify(txt, separator=' ')

    @property
    def _domain(self):
        d = urlparse(self.url).netloc
        return d.strip('www.')

    def update_slug(self):
        self.slug = self._slug

    def update_domain(self):
        self.domain = self._domain

    def update(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)
        if 'url' in kwargs or 'title' in kwargs:
            self.update_slug()
        if 'url' in kwargs:
            self.update_domain()
