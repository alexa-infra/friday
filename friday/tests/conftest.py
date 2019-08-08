import pytest

from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from friday.models import db, metadata


@pytest.fixture
def app():
    options = {
        'poolclass': StaticPool,
        'connect_args': {
            'check_same_thread': False
        }
    }
    engine = create_engine('sqlite:///:memory:', **options)
    db.configure(bind=engine)
    metadata.create_all(engine)
    try:
        yield
    finally:
        db.remove()
