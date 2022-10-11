import os
from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .errors import Errors
from .storage import Storage
from .static_ui import StaticUI
from .flask_sqlalchemy import FlaskSQLAlchemy
from .models import db


migrate = Migrate()
errors = Errors()
storage = Storage()
static_ui = StaticUI()
sa = FlaskSQLAlchemy()
jwt = JWTManager()


def make_app(settings=None):
    app = Flask(__name__, static_folder=None)
    app.config.from_object("friday.settings")
    if settings is not None:
        app.config.update(settings)

    app.url_map.strict_slashes = False

    migrations_path = os.path.join(app.root_path, "migrations")
    migrate.init_app(app, directory=migrations_path)
    errors.init_app(app)
    storage.init_app(app)
    static_ui.init_app(app)
    jwt.init_app(app)
    sa.init_app(app, db)

    from .views import api

    app.register_blueprint(api, url_prefix="/api")

    return app
