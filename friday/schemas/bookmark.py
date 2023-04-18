from marshmallow import fields

from . import BaseSchema


class Bookmark(BaseSchema):
    id = fields.Int(dump_only=True)
    url = fields.Str(required=True)
    title = fields.Str(required=True)
    created = fields.DateTime(dump_only=True)
    updated = fields.DateTime(dump_only=True)
    readed = fields.Bool(required=False)
    domain = fields.Str(dump_only=True)
    favorite = fields.Bool(required=True)
