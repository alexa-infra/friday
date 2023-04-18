from flask import jsonify
from marshmallow import Schema

from ..models import Pagination


class BaseSchema(Schema):
    @classmethod
    def jsonify(cls, data):
        schema = cls()
        if isinstance(data, Pagination):
            items = schema.dump(data.items, many=True)
            rv = dict(
                page=data.page,
                per_page=data.per_page,
                items=items,
                pages=data.pages,
                total=data.total,
            )
        elif isinstance(data, (list, set, tuple)):
            rv = schema.dump(data, many=True)
        else:
            rv = schema.dump(data)
        return jsonify(rv)
