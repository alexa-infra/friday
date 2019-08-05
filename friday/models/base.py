from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.declarative import declared_attr
from ..utils import camel_to_snake


session_factory = sessionmaker()
db = scoped_session(session_factory)


class CRUDMixin:
    """Mixin that adds convenience methods for CRUD (create, read, update, delete)
       operations."""

    query = db.query_property()

    @declared_attr
    def __tablename__(cls):
        return camel_to_snake(cls.__name__)

    @classmethod
    def create(cls, commit=True, **kwargs):
        """Create a new record and save it the database."""
        instance = cls(**kwargs)
        return instance.save(commit)

    def update(self, commit=True, **kwargs):
        """Update specific fields of a record."""
        for attr, value in kwargs.items():
            setattr(self, attr, value)
        return self.save() if commit else self

    def save(self, commit=True):
        """Save the record."""
        db.add(self)
        if commit:
            db.commit()
        return self

    def delete(self, commit=True):
        """Remove the record from the database."""
        db.delete(self)
        return commit and db.commit()

    @classmethod
    def get(cls, ident):
        """Get by identity"""
        return cls.query.get(ident)

    @classmethod
    def first_by(cls, **kwargs):
        """Filter by kwargs"""
        return cls.query.filter_by(**kwargs).first()


Model = declarative_base(cls=CRUDMixin)
metadata = Model.metadata
