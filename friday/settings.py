import os
from datetime import timedelta

JWT_COOKIE_SECURE = False
JWT_TOKEN_LOCATION = ["cookies"]
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "hellosecretworld")
JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=30)
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
UI_DIR = os.environ.get("UI_PATH", os.path.join(ROOT_DIR, "../build"))
STORAGE_PATH = os.environ.get("STORAGE_PATH", os.path.join(ROOT_DIR, "../images2"))
REDIS_URL = os.environ.get("REDIS_URL", ":fake:")
SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "sqlite:///database.sqlite")
APP_URL = os.environ.get("APP_URL", "http://localhost:8000")

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
