from urllib.parse import urlparse
from sqlalchemy import Column, Integer, Text, DateTime, Boolean
from sqlalchemy.ext.hybrid import hybrid_property
from slugify import slugify
from friday.utils import utcnow
from . import db


class Bookmark(db.Model):
    id = Column(Integer, primary_key=True)
    _url = Column('url', Text, nullable=False)
    _title = Column('title', Text, nullable=False)
    created = Column(DateTime, nullable=False, default=utcnow)
    updated = Column(DateTime, nullable=False, default=utcnow,
                     onupdate=utcnow)
    readed = Column(Boolean, nullable=False, default=False)
    slug = Column(Text)
    domain = Column(Text)

    @hybrid_property
    def url(self):
        return self._url

    @url.setter
    def url(self, value):
        self._url = value
        self.update_domain()
        self.update_slug()

    @hybrid_property
    def title(self):
        return self._title

    @title.setter
    def title(self, value):
        self._title = value
        self.update_slug()

    @property
    def _slug(self):
        txt = ' '.join(filter(None, [
            self.title,
            self._domain,
        ]))
        return slugify(txt, separator=' ')

    @property
    def _domain(self):
        d = urlparse(self._url).netloc
        return d.strip('www.')

    def update_slug(self):
        self.slug = self._slug

    def update_domain(self):
        self.domain = self._domain
