import os
from flask import Flask, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .errors import Errors

this_dir = os.path.dirname(os.path.abspath(__file__))
ui_dir = os.path.join(this_dir, '..', 'friday-ui', 'build')
migrations_path = os.path.join(this_dir, 'migrations')

def walk_dir(path):
    for dir_name, _, files in os.walk(path):
        for filename in files:
            file_path = os.path.join(dir_name, filename)
            yield os.path.relpath(file_path, path)

static_files = list(walk_dir(ui_dir))

migrate = Migrate(directory=migrations_path)
jwt = JWTManager()
errors = Errors()

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

    @app.route('/', defaults={'filename': None})
    @app.route('/<path:filename>')
    def render_ui(filename):
        if filename not in static_files:
            filename = 'index.html'
        return send_from_directory(ui_dir, filename)

    return app
