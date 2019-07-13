"""
Based on http://flask.pocoo.org/snippets/75/
"""
from functools import wraps, partial
import string
import json
from datetime import timedelta
from werkzeug.datastructures import CallbackDict
from flask import session as request_session
from flask.sessions import SessionInterface, SessionMixin
from .exceptions import Unauthorized
from .utils import get_random_string


def verify_auth_in_session():
    if 'user_id' not in request_session:
        raise Unauthorized

def auth_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_auth_in_session()
        return fn(*args, **kwargs)
    return wrapper

_chars = string.ascii_letters + string.digits
_get_token = partial(get_random_string, length=32, allowed_chars=_chars)


class RedisSession(CallbackDict, SessionMixin):

    def __init__(self, initial=None, sid=None, new=False):
        def on_update(self):
            self.modified = True
        CallbackDict.__init__(self, initial, on_update)
        self.sid = sid
        self.new = new
        self.modified = False


class RedisSessionInterface(SessionInterface):
    serializer = json
    session_class = RedisSession

    def __init__(self, redis, prefix='session:'):
        if not redis:
            raise ValueError
        self.redis = redis
        self.prefix = prefix

    def generate_sid(self):
        while True:
            token = _get_token()
            if not self.redis.exists(self.prefix + token):
                return token

    def get_redis_expiration_time(self, app, session):
        if session.permanent:
            return app.permanent_session_lifetime
        return timedelta(days=1)

    def open_session(self, app, request):
        cookie_sid = request.cookies.get(app.session_cookie_name)
        header_sid = request.headers.get(app.session_cookie_name)
        sid = next((x for x in (cookie_sid, header_sid) if x is not None), None)
        if not sid:
            sid = self.generate_sid()
            return self.session_class(sid=sid, new=True)
        sid = sid[:32]
        val = self.redis.get(self.prefix + sid)
        if val is not None:
            data = self.serializer.loads(val)
            return self.session_class(data, sid=sid)
        sid = self.generate_sid()
        return self.session_class(sid=sid, new=True)

    def get_redis_key(self, session):
        return self.prefix + session.sid

    def save_session(self, app, session, response):
        domain = self.get_cookie_domain(app)
        if not session:
            self.redis.delete(self.prefix + session.sid)
            if session.modified:
                response.delete_cookie(app.session_cookie_name,
                                       domain=domain)
            return
        redis_exp = self.get_redis_expiration_time(app, session)
        cookie_exp = self.get_expiration_time(app, session)
        cookie_path = self.get_cookie_path(app)
        cookie_secure = self.get_cookie_secure(app)
        val = self.serializer.dumps(dict(session))
        self.redis.set(self.prefix + session.sid, val)
        self.redis.expire(self.prefix + session.sid, int(redis_exp.total_seconds()))
        response.set_cookie(app.session_cookie_name,
                            session.sid,
                            expires=cookie_exp,
                            httponly=True,
                            domain=domain,
                            path=cookie_path,
                            secure=cookie_secure)
