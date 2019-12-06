from redis import Redis
from fakeredis import FakeStrictRedis


class FlaskRedis:
    def __init__(self, app=None, **kwargs):
        self._redis_client = None

        if app is not None:
            self.init_app(app, **kwargs)

    def init_app(self, app, **kwargs):
        redis_url = app.config.setdefault("REDIS_URL", "redis://localhost:6379/0")
        if self._redis_client is None:
            if redis_url == ":fake:":
                self._redis_client = FakeStrictRedis()
            else:
                self._redis_client = Redis.from_url(redis_url, **kwargs)

    def __getattr__(self, name):
        return getattr(self._redis_client, name)
