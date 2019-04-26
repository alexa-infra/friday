from flask_sqlalchemy import SQLAlchemy, Model


class CRUDMixin(Model):
    """Mixin that adds convenience methods for CRUD (create, read, update, delete)
       operations."""

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
        db.session.add(self)
        if commit:
            db.session.commit()
        return self

    def delete(self, commit=True):
        """Remove the record from the database."""
        db.session.delete(self)
        return commit and db.session.commit()

    @classmethod
    def get(cls, ident):
        """Shortcut to cls.query.get"""
        return cls.query.get(ident)

    @classmethod
    def get_or_404(cls, ident):
        """Shortcut to cls.query.get_or_404"""
        return cls.query.get_or_404(ident)

    @classmethod
    def first_or_404(cls, ident):
        """Shortcut to cls.query.first_or_404"""
        return cls.query.first_or_404(ident)


db = SQLAlchemy(model_class=CRUDMixin)
