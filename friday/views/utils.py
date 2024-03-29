from typing import Any

from slugify import slugify
from sqlalchemy.orm import Query
from webargs import fields
from werkzeug.exceptions import abort


def validate_per_page(val: int) -> bool:
    if val <= 0 or val > 100:
        return False
    return True


def validate_page(val: int) -> bool:
    if val < 0:
        return False
    return True


pagination_args = {
    "page": fields.Int(required=False, validate=validate_page, missing=1),
    "per_page": fields.Int(required=False, validate=validate_per_page, missing=10),
}


def clear_search(txt):
    return slugify(txt, separator=" ")


search_args = {
    "search": fields.Function(deserialize=clear_search, required=False, missing=None),
}


tag_args = {"tag": fields.Function(deserialize=slugify, required=False, missing=None)}


def get_or_404(model_or_query: Any, ident: Any) -> Any:
    """only single primary keys"""
    query = model_or_query if isinstance(model_or_query, Query) else model_or_query.query
    rv = query.get(ident)
    if rv is None:
        abort(404)
    return rv


def first_or_404(model_or_query: Any, *args: Any, **kwargs: Any) -> Any:
    """first_or_404(Model, Model.name=='bob')
    first_or_404(Model, name='bob')
    """
    query = model_or_query if isinstance(model_or_query, Query) else model_or_query.query
    if args:
        query = query.filter(*args)
    elif kwargs:
        query = query.filter_by(**kwargs)
    rv = query.first()
    if rv is None:
        abort(404)
    return rv
