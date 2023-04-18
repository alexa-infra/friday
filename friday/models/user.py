from flask import session
from sqlalchemy import Column, DateTime, Integer, Text
from sqlalchemy.orm import validates

from friday.exceptions import Unauthorized
from friday.utils import check_password_hash, make_password_hash, utcnow

from .base import Model


class User(Model):
    id = Column(Integer, primary_key=True)
    email = Column(Text, unique=True)
    password = Column(Text)
    created = Column(DateTime, default=utcnow)
    updated = Column(DateTime, default=utcnow, onupdate=utcnow)

    @classmethod
    def authenticate(cls, email, password):
        user = User.query.filter(User.email == email).first()
        if not user:
            raise Unauthorized
        if not check_password_hash(password, user.password):
            raise Unauthorized
        return user

    @classmethod
    def identify(cls, user_id):
        return User.query.filter(User.id == user_id).first()

    @property
    def token(self):
        return session.sid

    @classmethod
    def current_user(cls, raise_exception=True):
        user_id = session.get("user_id", None)
        if user_id is None:
            if raise_exception:
                raise Unauthorized
            return None
        user = cls.query.filter(User.id == user_id).first()
        if user is None and raise_exception:
            raise Unauthorized
        return user

    @validates("password")
    def set_password_hash(self, _key, value):
        # pylint: disable=no-self-use
        if not value:
            raise ValueError("password is empty")
        return make_password_hash(value)
