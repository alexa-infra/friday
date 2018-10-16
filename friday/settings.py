import os
from datetime import timedelta

this_dir = os.path.dirname(os.path.abspath(__file__))

DEBUG = True
SECRET_KEY = 'blah-blah-blah'

db_path = os.path.join(this_dir, 'database.sqlite')
SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(db_path)
SQLALCHEMY_ECHO = True
SQLALCHEMY_TRACK_MODIFICATIONS = False

SERVER_NAME = os.environ.get('SERVER_NAME', None)

JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=90)
JWT_TOKEN_LOCATION = ['cookies']
JWT_ACCESS_COOKIE_PATH = '/api/'
JWT_COOKIE_CSRF_PROTECT = False