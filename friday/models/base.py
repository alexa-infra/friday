from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import as_declarative, scoped_session, sessionmaker

from ..utils import camel_to_snake

session_factory = sessionmaker()
db = scoped_session(session_factory)


@as_declarative()
class Model:
    """Mixin that adds convenience methods for CRUD (create, read, update, delete)
    operations."""

    query = db.query_property()

    @declared_attr
    def __tablename__(cls):  # pylint: disable=no-self-argument
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


metadata = Model.metadata
