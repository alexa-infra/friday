import os

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
UI_DIR = os.environ.get("UI_PATH", os.path.join(ROOT_DIR, "../build"))
STORAGE_PATH = os.environ.get("STORAGE_PATH", os.path.join(ROOT_DIR, "../images2"))
REDIS_URL = os.environ.get("REDIS_URL", ":fake:")
SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "sqlite:///database.sqlite")

DEBUG = False

JSON_AS_ASCII = False
JSONIFY_PRETTYPRINT_REGULAR = True

RECIPE_THUMBNAIL_SIZE = 300

STATIC_EXT = [
    ".js",
    ".json",
    ".css",
    ".svg",
    ".ttf",
    ".eot",
    ".jpeg",
    ".jpg",
    ".png",
    ".woff",
    ".woff2",
    ".css.map",
    ".js.map",
    ".ico",
    ".html",
]
