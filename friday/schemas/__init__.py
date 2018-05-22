from marshmallow import Schema
from flask import jsonify
from flask_sqlalchemy import Pagination


class BaseSchema(Schema):
    class Meta:
        strict = True

    @classmethod
    def jsonify(cls, data):
        if isinstance(data, Pagination):
            schema = cls(many=True)
            items, _ = schema.dump(data.items)
            rv = dict(page=data.page, per_page=data.per_page,
                      items=items, pages=data.pages,
                      total=data.total)
        elif isinstance(data, (list, set)):
            schema = cls(many=True)
            rv, _ = schema.dump(data)
        else:
            schema = cls()
            rv, _ = schema.dump(data)
        return jsonify(rv)

from .link import Link
from .user import User
from .event import Event
from .bookmark import Bookmark
