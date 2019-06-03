import pytest

from friday import make_app
from friday.models import db


settings = {
    'SQLALCHEMY_DATABASE_URI': 'sqlite:///:memory:',
    'SQLALCHEMY_ECHO': False,
}


@pytest.fixture
def app():
    the_app = make_app(settings)
    with the_app.app_context():
        db.create_all()
        db.session.commit()
        yield the_app
