import os
from flask import Flask
from flask_migrate import Migrate
from .errors import Errors
from .storage import Storage
from .static_ui import StaticUI
from .flask_redis import FlaskRedis
from .session import RedisSessionInterface
from .flask_sqlalchemy import FlaskSQLAlchemy


migrate = Migrate()
errors = Errors()
storage = Storage()
static_ui = StaticUI()
redis = FlaskRedis()
sa = FlaskSQLAlchemy()


def make_app(settings=None):
    app = Flask(__name__, static_folder=None)
    app.config.from_object('friday.settings')
    if settings is not None:
        app.config.update(settings)
    else:
        app.config.from_pyfile('local_settings.py', silent=True)

    app.url_map.strict_slashes = False
    app.session_interface = RedisSessionInterface(redis)

    migrations_path = os.path.join(app.root_path, 'migrations')
    migrate.init_app(app, directory=migrations_path)
    errors.init_app(app)
    storage.init_app(app)
    static_ui.init_app(app)
    redis.init_app(app)

    from .models import db
    sa.init_app(app, db)

    from .views import api
    app.register_blueprint(api, url_prefix='/api')

    return app
