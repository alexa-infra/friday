from flask import Blueprint
from flask.views import MethodView

api = Blueprint('api', __name__)


class BaseView(MethodView):
    route_base = None

    @classmethod
    def register(cls, app, name):
        view = cls.as_view(name)
        route_base = cls.route_base
        app.add_url_rule(route_base, view_func=view)
