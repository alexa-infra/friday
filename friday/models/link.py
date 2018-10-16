from sqlalchemy import Column, Integer, Text, DateTime
from friday.utils import utcnow
from . import db


class Link(db.Model):
    id = Column(Integer, primary_key=True)
    url = Column(Text)
    title = Column(Text)
    usage_count = Column(Integer, default=0)
    last_access = Column(DateTime, default=utcnow)

    def touch(self):
        self.last_access = utcnow()
        self.usage_count += 1

    @classmethod
    def query_all(cls):
        return cls.query.order_by(Link.last_access.desc())

    def update(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)