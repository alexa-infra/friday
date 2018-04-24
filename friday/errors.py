from flask import jsonify
from .exceptions import NotFound, Unauthorized, Forbidden


class Errors:
    def __init__(self, app=None):
        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        self._register_handlers(app)

    def _register_handlers(self, app):
        @app.errorhandler(404)
        @app.errorhandler(NotFound)
        def not_found(_):
            return jsonify(dict(errors=['Not Found'])), 404

        @app.errorhandler(401)
        @app.errorhandler(Unauthorized)
        def unauthorized(_):
            return jsonify(dict(errors=['Unauthorized'])), 401

        @app.errorhandler(403)
        @app.errorhandler(Forbidden)
        def forbidden(_):
            return jsonify(dict(errors=['Forbidden'])), 403

        @app.errorhandler(422)
        def unprocessable(err):
            return jsonify(dict(errors=err.data['messages'])), 422

        @app.errorhandler(405)
        def method_not_allowed(_):
            return jsonify(dict(errors=['Method is not allowed'])), 405
        @app.errorhandler(500)
        def server_error(_):
            return jsonify(dict(errors=['Internal server error'])), 500
