from urllib.parse import unquote
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

    @classmethod
    def new(cls, **kwargs):
        obj = cls(**kwargs)
        obj.update_slug()
        return obj

    @property
    def unquoted_url(self):
        return unquote(self.url)

    @property
    def clean_url(self):
        return self.unquoted_url.strip('http://').strip('https://')

    @property
    def _slug(self):
        txt = ' '.join(filter(None, [
            self.clean_url,
            self.title,
        ]))
        return slugify(txt, separator=' ')

    def update_slug(self):
        self.slug = self._slug

    def update(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)
        if 'url' in kwargs or 'title' in kwargs:
            self.update_slug()
