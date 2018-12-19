import os
from flask import Flask, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .errors import Errors


this_dir = os.path.dirname(os.path.abspath(__file__))
ui_dir = os.path.join(this_dir, '..', 'friday-ui', 'build')
migrations_path = os.path.join(this_dir, 'migrations')
storage_dir = os.path.join(this_dir, '..', 'images2')


def walk_dir(path):
    for dir_name, _, files in os.walk(path):
        for filename in files:
            file_path = os.path.join(dir_name, filename)
            yield os.path.relpath(file_path, path)


static_files = list(walk_dir(ui_dir))
migrate = Migrate(directory=migrations_path)
jwt = JWTManager()
errors = Errors()
static_ext = [
    '.js', '.json', '.css', '.svg', '.ttf', '.eot',
    '.jpeg', '.jpg', '.png',
    '.woff', '.woff2', '.css.map', '.js.map', '.ico',
    '.html',
]


def is_static(filename):
    if filename is None:
        return False
    return any(filename.endswith(ext) for ext in static_ext)


def make_app(settings=None):
    app = Flask(__name__, static_folder=None)
    app.root_path = this_dir
    app.config.from_object('friday.settings')
    if settings:
        app.config.update(settings)
    app.url_map.strict_slashes = False

    from .models import db
    db.init_app(app)

    migrate.init_app(app)
    jwt.init_app(app)
    errors.init_app(app)

    from .views import api
    app.register_blueprint(api, url_prefix='/api')

    @app.route('/storage/<path:filename>')
    def storage_file(filename):  # pylint: disable=unused-variable
        return send_from_directory(storage_dir, filename)

    @app.route('/', defaults={'filename': None})
    @app.route('/<path:filename>')
    def render_ui(filename):  # pylint: disable=unused-variable
        if filename not in static_files:
            if is_static(filename):
                return '', 404
            filename = 'index.html'
        response = send_from_directory(ui_dir, filename)
        if filename == 'service-worker.js':
            response.headers['Cache-Control'] = 'no-cache'
        return response

    return app
