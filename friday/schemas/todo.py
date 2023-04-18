from marshmallow import fields

from . import base


class TodoItem(base.BaseSchema):
    id = fields.Int(dump_only=True)

    created = fields.DateTime(dump_only=True)
    updated = fields.DateTime(dump_only=True)
    deleted = fields.Bool(require=True)

    parent_id = fields.Int(required=True, allow_none=True)
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    order = fields.Int(required=True)
    dueto = fields.Date(required=True, allow_none=True)
    done = fields.Bool(required=True)
    focus = fields.Bool(required=True)
    folder = fields.Bool(required=True)
