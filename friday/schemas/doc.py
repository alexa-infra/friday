from marshmallow import fields
from . import BaseSchema


class Doc(BaseSchema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    created = fields.DateTime(dump_only=True)
    updated = fields.DateTime(dump_only=True)
    tags = fields.List(fields.Str(), required=True, attribute='tagsList')
