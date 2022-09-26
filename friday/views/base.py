from datetime import datetime
from datetime import timedelta
from datetime import timezone
from functools import partial
from flask import Blueprint
from flask.views import MethodView, http_method_funcs
from flask_jwt_extended import jwt_required, get_jwt, create_access_token, get_jwt_identity, set_access_cookies
from webargs.flaskparser import FlaskParser
from friday.utils import camel_to_snake
from typing import Optional, Tuple, Any

api = Blueprint("api", __name__)


@api.after_request
def add_cors_headers(response):
    headers = {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': ', '.join(['GET', 'POST', 'PUT', 'DELETE']),
        'Access-Control-Allow-Headers': ', '.join(['Content-Type', 'Accept']),
        'Access-Control-Allow-Credentials': 'true',
    }
    response.headers.extend(headers)
    return response


@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(days=10))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        return response


class BaseView(MethodView):
    route_base: Optional[str] = None
    decorators: Optional[Tuple[Any]] = (jwt_required(),)

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        if not hasattr(cls, "methods") or not cls.methods:
            methods = [
                method.upper() for method in http_method_funcs if hasattr(cls, method)
            ]
            if methods:
                cls.methods = methods
        name = camel_to_snake(cls.__name__)
        cls.register(api, name)

    @classmethod
    def register(cls, app, name):
        view = cls.as_view(name)
        route_base = cls.route_base
        app.add_url_rule(route_base, view_func=view)


class Parser(FlaskParser):
    DEFAULT_VALIDATION_STATUS = 422


parser = Parser()
use_kwargs = partial(parser.use_args, as_kwargs=True)
use_args = parser.use_args
query_args = partial(parser.use_args, location="query", as_kwargs=True)
