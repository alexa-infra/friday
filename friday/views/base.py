from flask import Blueprint
from flask.views import MethodView
from friday.utils import camel_to_snake

api = Blueprint('api', __name__)


class BaseView(MethodView):
    route_base = None

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        name = camel_to_snake(cls.__name__)
        cls.register(api, name)

    @classmethod
    def register(cls, app, name):
        view = cls.as_view(name)
        route_base = cls.route_base
        app.add_url_rule(route_base, view_func=view)
