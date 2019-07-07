from flask import Flask
from flask_migrate import Migrate
from .errors import Errors
from .storage import Storage
from .static_ui import StaticUI
from .flask_redis import FlaskRedis
from .session import RedisSessionInterface


migrate = Migrate()
errors = Errors()
storage = Storage()
static_ui = StaticUI()
redis = FlaskRedis()


def make_app(settings=None):
    app = Flask(__name__, static_folder=None)
    app.config.from_object('friday.settings')
    if settings:
        app.config.update(settings)
    app.url_map.strict_slashes = False
    app.session_interface = RedisSessionInterface(redis)

    from .models import db
    db.init_app(app)

    migrations_path = app.config['MIGRATIONS_DIR']
    migrate.init_app(app, directory=migrations_path)
    errors.init_app(app)
    storage.init_app(app)
    static_ui.init_app(app)
    redis.init_app(app)

    from .views import api
    app.register_blueprint(api, url_prefix='/api')

    return app
