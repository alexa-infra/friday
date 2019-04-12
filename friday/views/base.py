from flask import Blueprint
from flask.views import MethodView, http_method_funcs
from friday.utils import camel_to_snake

api = Blueprint('api', __name__)


class BaseView(MethodView):
    route_base = None

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
