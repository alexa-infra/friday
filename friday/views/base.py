from flask import Blueprint
from flask.views import MethodView, http_method_funcs
from friday.session import auth_required
from friday.utils import camel_to_snake
from typing import Optional, Tuple, Any

api = Blueprint('api', __name__)


class BaseView(MethodView):
    route_base: Optional[str] = None
    decorators: Optional[Tuple[Any]] = (auth_required, )

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        if not hasattr(cls, 'methods') or not cls.methods:
            methods = [method.upper()
                       for method in http_method_funcs
                       if hasattr(cls, method)]
            if methods:
                cls.methods = methods
        name = camel_to_snake(cls.__name__)
        cls.register(api, name)

    @classmethod
    def register(cls, app, name):
        view = cls.as_view(name)
        route_base = cls.route_base
        app.add_url_rule(route_base, view_func=view)
