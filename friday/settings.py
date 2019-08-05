import os

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
UI_DIR = os.path.join(ROOT_DIR, '..', 'friday-ui', 'build')
STORAGE_PATH = os.path.join(ROOT_DIR, '..', 'images2')

REDIS_URL = 'redis://127.0.0.1:6379/0'

DB_PATH = os.path.join(ROOT_DIR, 'database.sqlite')
SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(DB_PATH)

JSON_AS_ASCII = False

RECIPE_THUMBNAIL_SIZE = 300

STATIC_EXT = [
    '.js', '.json', '.css', '.svg', '.ttf', '.eot',
    '.jpeg', '.jpg', '.png',
    '.woff', '.woff2', '.css.map', '.js.map', '.ico',
    '.html',
]
