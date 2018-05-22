from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .link import Link
from .user import User
from .event import Event, Repeat
from .bookmark import Bookmark
