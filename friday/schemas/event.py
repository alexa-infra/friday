from marshmallow import fields
from marshmallow.validate import OneOf
from friday.models import Repeat
from . import BaseSchema


class Event(BaseSchema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    icon = fields.Str(required=True)
    date = fields.Date(required=True)
    repeat = fields.Str(allow_none=True, missing=None,
                        validate=OneOf(Repeat.names()))


class EventMatch(BaseSchema):
    date = fields.Date()
    event = fields.Nested(Event)
