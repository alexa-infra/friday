from sqlalchemy import create_engine


class FlaskSQLAlchemy:

    def __init__(self, app=None, db=None):
        self.engine = None
        if app:
            self.init_app(app, db)

    def init_app(self, app, db):
        app.extensions['sqlalchemy'] = self

        app.config.setdefault('SQLALCHEMY_DATABASE_URI', 'sqlite:///:memory:')
        app.config.setdefault('SQLALCHEMY_ENGINE_OPTIONS', {})

        engine = self.make_engine(app)
        db.configure(bind=engine)

        # pylint: disable=unused-variable
        @app.teardown_appcontext
        def shutdown_session(response_or_exc):
            db.remove()
            return response_or_exc

    def make_engine(self, app):
        uri = app.config['SQLALCHEMY_DATABASE_URI']
        options = app.config['SQLALCHEMY_ENGINE_OPTIONS']
        self.engine = rv = create_engine(uri, **options)
        return rv
