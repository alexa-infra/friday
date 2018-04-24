import os
from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .errors import Errors

this_dir = os.path.dirname(os.path.abspath(__file__))
migrations_path = os.path.join(this_dir, 'migrations')

migrate = Migrate(directory=migrations_path)
jwt = JWTManager()
errors = Errors()

def make_app(settings=None):
    app = Flask(__name__)
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

    return app
