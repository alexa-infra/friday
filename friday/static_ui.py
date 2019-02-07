import os
from flask import send_from_directory


class StaticUI:

    def __init__(self, app=None):
        self.ui_dir = None
        self.static_ext = None
        if app:
            self.init_app(app)

    def init_app(self, app):
        self.ui_dir = app.config['UI_DIR']
        self.static_ext = app.config['STATIC_EXT']
        self._register_route(app)
        return self

    def is_static(self, filename):
        if filename is None:
            return False
        return any(filename.endswith(ext) for ext in self.static_ext)

    def _register_route(self, app):
        @app.route('/', defaults={'filename': None})
        @app.route('/<path:filename>')
        def render_ui(filename):  # pylint: disable=unused-variable
            if self.is_static(filename):
                if not os.path.exists(os.path.join(self.ui_dir, filename)):
                    return '', 404
            else:
                filename = 'index.html'
            response = send_from_directory(self.ui_dir, filename)
            if filename == 'service-worker.js':
                response.headers['Cache-Control'] = 'no-cache'
            return response
