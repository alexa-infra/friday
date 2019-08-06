import pytest

from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from friday.models import db


@pytest.fixture
def app():
    options = {
        'poolclass': StaticPool,
        'connect_args': {
            'check_same_thread': False
        }
    }
    engine = create_engine('sqlite:///:memory:', **options)
    db.configure(engine)
    db.create_all()
    try:
        yield
    finally:
        db.session.remove()
