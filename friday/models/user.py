from sqlalchemy import Column, Integer, Text, DateTime
from flask_jwt_extended import create_access_token, get_jwt_identity
from friday.utils import utcnow, make_password_hash, check_password_hash
from friday.exceptions import Unauthorized
from . import db


class User(db.Model):
    id = Column(Integer, primary_key=True)
    email = Column(Text, unique=True)
    password = Column(Text)
    created = Column(DateTime, default=utcnow)
    updated = Column(DateTime, default=utcnow, onupdate=utcnow)

    @classmethod
    def new(cls, email, password):
        hashed = make_password_hash(password)
        return cls(email=email, password=hashed)

    @classmethod
    def authenticate(cls, email, password):
        user = (
            db.session.query(cls).filter(User.email==email)
            .first())
        if not user:
            raise Unauthorized
        if not check_password_hash(password, user.password):
            raise Unauthorized
        return user

    @property
    def token(self):
        return create_access_token(identity=self.id)

    @classmethod
    def current_user(cls, raise_exception=True):
        user_id = get_jwt_identity()
        if user_id is None:
            if raise_exception:
                raise Unauthorized
            return None
        user = (
            db.session.query(cls).filter(User.id==user_id)
            .first())
        if user is None and raise_exception:
            raise Unauthorized
        return user

    def update(self, **kwargs):
        for k, v in kwargs.items():
            if k == 'password':
                v = make_password_hash(v)
            setattr(self, k, v)
