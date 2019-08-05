from sqlalchemy import Column, Integer, Text, DateTime
from friday.utils import utcnow
from .base import Model


class Link(Model):
    id = Column(Integer, primary_key=True)
    url = Column(Text)
    title = Column(Text)
    usage_count = Column(Integer, default=0)
    last_access = Column(DateTime, default=utcnow)

    def touch(self, commit=True):
        self.last_access = utcnow()
        self.usage_count += 1
        return self.save(commit)

    @classmethod
    def query_all(cls):
        return cls.query.order_by(Link.last_access.desc())
