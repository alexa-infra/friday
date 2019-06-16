from webargs import fields
from slugify import slugify


def validate_per_page(val):
    if val <= 0 or val > 100:
        return False
    return True


def validate_page(val):
    if val < 0:
        return False
    return True


pagination_args = {
    'page': fields.Int(required=False, location='query',
                       validate=validate_page),
    'per_page': fields.Int(required=False, location='query',
                           validate=validate_per_page),
}


clear_search = lambda txt: slugify(txt, separator=' ')


search_args = {
    'search': fields.Function(deserialize=clear_search, required=False, location='query'),
}
