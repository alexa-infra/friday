from marshmallow import fields
from . import BaseSchema


class RecipeImage(BaseSchema):
    filename = fields.Str(required=True)
    url = fields.Str(dump_only=True)
    width = fields.Int(dump_only=True)
    height = fields.Int(dump_only=True)


class Recipe(BaseSchema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    names = fields.List(fields.Str(), required=True, attribute="namesList")
    created = fields.DateTime(dump_only=True)
    updated = fields.DateTime(dump_only=True)
    tags = fields.List(fields.Str(), required=True, attribute="tagsList")
    images = fields.List(fields.Nested(RecipeImage), dump_only=True)
