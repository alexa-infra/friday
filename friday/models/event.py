from datetime import datetime, timedelta
import enum
from sqlalchemy import Column, Integer, Text, Enum, Date
from friday.utils import utcnow
from . import db


def iter_days(a, b):
    delta = timedelta(days=1)
    while a <= b:
        yield a
        a += delta

def get_week(a):
    if a.isoweekday() == 7:
        return a
    return a - timedelta(days=a.isoweekday())

class Repeat(enum.Enum):
    daily = enum.auto()
    weekly = enum.auto()
    biweekly = enum.auto()
    monthly = enum.auto()
    annually = enum.auto()

    @classmethod
    def names(cls):
        return list(cls.__members__.keys())

    def __str__(self):
        return self.name

class Event(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    icon = Column(Text, nullable=False)
    date = Column(Date, nullable=False)
    repeat = Column(Enum(Repeat), default=None)

    @classmethod
    def new(cls, **kwargs):
        repeat = kwargs.pop('repeat', None)
        if repeat is not None:
            repeat = Repeat[repeat]
        return cls(repeat=repeat, **kwargs)

    def update(self, **kwargs):
        for k, v in kwargs.items():
            if k == 'repeat':
                if v is not None:
                    v = Repeat[v]
            setattr(self, k, v)

    @classmethod
    def query_all(cls):
        return db.session.query(cls).order_by(Event.date.desc())

    @classmethod
    def get_notrepeated_between(cls, a, b):
        query = (
            db.session.query(cls).filter(Event.repeat == None)
            .filter(Event.date >= a)
            .filter(Event.date <= b)
        )
        return query.all()

    @classmethod
    def get_repeated(cls):
        query = (
            db.session.query(cls).filter(Event.repeat != None)
        )
        return query.all()

    @classmethod
    def get_between(cls, a, b):
        not_repeated = cls.get_notrepeated_between(a, b)
        repeated = cls.get_repeated()
        matched = [
            (dt, event) for event in repeated
            for dt in iter_days(a, b) if event.check_date(dt)
        ]
        allmatches = [(x.date, x) for x in not_repeated] + matched
        return list(map(lambda it: dict(date=it[0], event=it[1]), allmatches))

    def is_between(self, a, b):
        if self.repeat is None:
            return self.date >= a and self.date <= b
        if self.date > b:
            return False
        for dt in iter_days(a, b):
            if self.check_date(dt):
                return True
        return False

    def check_date(self, dt):
        if self.repeat == Repeat.daily:
            return True
        if self.repeat == Repeat.weekly:
            return dt.isoweekday() == self.date.isoweekday()
        if self.repeat == Repeat.biweekly:
            start, end = get_week(self.date), get_week(dt)
            ts = end - start
            weeks = ts.days / 7
            even_week = weeks % 2 == 0
            return even_week and dt.isoweekday() == self.date.isoweekday()
        if self.repeat == Repeat.monthly:
            return dt.day == self.date.day
        if self.repeat == Repeat.annually:
            return dt.day == self.date.day and dt.month == self.date.month
        return False
