import pytest

from flask import Flask, session
from friday.session import RedisSessionInterface
from fakeredis import FakeStrictRedis


@pytest.fixture(scope='function')
def app():
    app = Flask(__name__)
    redis = FakeStrictRedis()
    app.session_interface = RedisSessionInterface(redis)

    @app.route('/')
    def index():
        return 'Hello world', 200

    @app.route('/private')
    def private():
        if 'user_id' not in session:
            return 'Not OK', 403
        return 'Hello world', 200

    @app.route('/login')
    def login():
        session['user_id'] = 123
        return 'OK', 200

    @app.route('/logout')
    def logout():
        session.clear()
        return 'OK', 200

    with app.app_context():
        yield app

def get_cookie(client, name):
    cookies = (cookie for cookie in client.cookie_jar if cookie.name == name)
    return next(cookies, None)

def test_no_session_on_index(app):
    with app.test_client() as client:
        r = client.get('/')
        assert r.status_code == 200
        cookie = get_cookie(client, 'session')
        assert cookie is None

def test_no_session_on_private(app):
    with app.test_client() as client:
        r = client.get('/private')
        assert r.status_code == 403
        cookie = get_cookie(client, 'session')
        assert cookie is None

def test_login_set_cookie(app):
    with app.test_client() as client:
        r = client.get('/login')
        assert r.status_code == 200
        cookie = get_cookie(client, 'session')
        assert cookie is not None

def test_login_set_redis(app):
    with app.test_client() as client:
        r = client.get('/login')
        assert r.status_code == 200
        cookie = get_cookie(client, 'session')
        session_interface = app.session_interface
        redis = session_interface.redis
        exists = redis.exists(session_interface.prefix + cookie.value)
        assert exists

def test_with_session_on_private(app):
    with app.test_client() as client:
        client.get('/login')
        r = client.get('/private')
        assert r.status_code == 200

def test_session_same_value(app):
    with app.test_client() as client:
        client.get('/login')
        cookie = get_cookie(client, 'session')
        session_id = cookie.value
        r = client.get('/private')
        cookie = get_cookie(client, 'session')
        assert cookie.value == session_id

def test_wrong_session(app):
    with app.test_client() as client:
        client.set_cookie('localhost.local', 'session', 'a' * 32)
        r = client.get('/private')
        assert r.status_code == 403
        cookie = get_cookie(client, 'session')
        assert cookie is not None
        assert cookie.value == 'a' * 32

def test_wrong_session_login(app):
    with app.test_client() as client:
        client.set_cookie('localhost.local', 'session', 'a' * 32)
        r = client.get('/login')
        assert r.status_code == 200
        cookie = get_cookie(client, 'session')
        assert cookie is not None
        assert cookie.value != 'a' * 32

def test_rem_session(app):
    with app.test_client() as client:
        r = client.get('/login')
        assert r.status_code == 200
        cookie = get_cookie(client, 'session')
        session_interface = app.session_interface
        redis = session_interface.redis
        redis.delete(session_interface.prefix + cookie.value)
        exists = redis.exists(session_interface.prefix + cookie.value)
        assert not exists
        r = client.get('/private')
        assert r.status_code == 403

def test_logout(app):
    with app.test_client() as client:
        r = client.get('/login')
        assert r.status_code == 200
        cookie = get_cookie(client, 'session')
        session_interface = app.session_interface
        redis = session_interface.redis
        r = client.get('/logout')
        exists = redis.exists(session_interface.prefix + cookie.value)
        assert not exists
        cookie = get_cookie(client, 'session')
        assert cookie is None
