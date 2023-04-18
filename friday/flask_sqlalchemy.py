from typing import TYPE_CHECKING, Optional

from sqlalchemy import create_engine

if TYPE_CHECKING:
    from flask import Flask
    from sqlalchemy.engine import Engine
    from sqlalchemy.orm import scoped_session


class FlaskSQLAlchemy:
    engine: Optional["Engine"] = None

    def __init__(self, app: "Flask" = None, db: "scoped_session" = None) -> None:
        self.engine = None
        if app and db:
            self.init_app(app, db)

    def init_app(self, app: "Flask", db: "scoped_session") -> None:
        if not app or not db:
            raise ValueError
        app.extensions["sqlalchemy"] = self

        uri = app.config.setdefault("SQLALCHEMY_DATABASE_URI", "sqlite:///:memory:")
        options = app.config.setdefault("SQLALCHEMY_ENGINE_OPTIONS", {})

        self.engine = create_engine(uri, future=True, **options)
        db.configure(bind=self.engine)

        # pylint: disable=unused-variable
        @app.teardown_appcontext
        def shutdown_session(response_or_exc):
            db.remove()
            return response_or_exc
