from marshmallow import fields
from . import BaseSchema


class Link(BaseSchema):
    id = fields.Int(dump_only=True)
    url = fields.Str(required=True)
    title = fields.Str(required=True)
    usage_count = fields.Int(dump_only=True)
    last_access = fields.DateTime(dump_only=True)
