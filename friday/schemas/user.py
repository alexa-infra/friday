from marshmallow import fields
from . import BaseSchema


class User(BaseSchema):
    id = fields.Int(dump_only=True)
    email = fields.Str(required=True)
    password = fields.Str(load_only=True, required=True)
    created = fields.Str(dump_only=True)
    updated = fields.Str(dump_only=True)
