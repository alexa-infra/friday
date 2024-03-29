from marshmallow import fields

from . import BaseSchema


class Tag(BaseSchema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)


class TagCloud(BaseSchema):
    name = fields.Str(required=True)
    count = fields.Int(required=True)
