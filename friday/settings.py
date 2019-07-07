import os
from datetime import timedelta

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
UI_DIR = os.path.join(ROOT_DIR, '..', 'friday-ui', 'build')
MIGRATIONS_DIR = os.path.join(ROOT_DIR, 'migrations')

REDIS_URL = 'redis://127.0.0.1:6379/0'

DEBUG = True
SECRET_KEY = 'blah-blah-blah'

DB_PATH = os.path.join(ROOT_DIR, 'database.sqlite')
SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(DB_PATH)
#SQLALCHEMY_ECHO = True
SQLALCHEMY_TRACK_MODIFICATIONS = False

SERVER_NAME = os.environ.get('SERVER_NAME', None)

JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=90)
JWT_TOKEN_LOCATION = ('cookies', 'headers')
JWT_ACCESS_COOKIE_PATH = '/api/'
JWT_COOKIE_CSRF_PROTECT = False
JWT_HEADER_NAME = 'X-Authentication-Token'

JSON_AS_ASCII = False
STORAGE_PATH = os.path.join(ROOT_DIR, '..', 'images2')

MAX_IMAGE_SIZE = 1024

STATIC_EXT = [
    '.js', '.json', '.css', '.svg', '.ttf', '.eot',
    '.jpeg', '.jpg', '.png',
    '.woff', '.woff2', '.css.map', '.js.map', '.ico',
    '.html',
]
