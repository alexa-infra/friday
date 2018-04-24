from marshmallow import Schema
from flask import jsonify


class BaseSchema(Schema):
    class Meta:
        strict = True

    @classmethod
    def jsonify(cls, data, many=False):
        schema = cls(many=many)
        rv, _ = schema.dump(data)
        return jsonify(rv)

from .link import Link
