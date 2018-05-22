from sqlalchemy import Column, Integer, Text, DateTime, Boolean
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

    @classmethod
    def new(cls, **kwargs):
        obj = cls(**kwargs)
        return obj

    def update(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)
