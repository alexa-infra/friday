from flask import Blueprint

api = Blueprint('api', __name__)

from flask import jsonify
from flask_classful import FlaskView


class IndexView(FlaskView):
    route_base = '/'

    def index(self):
        return jsonify(dict(message='Hello World')), 200

IndexView.register(api, trailing_slash=False)
