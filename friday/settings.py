import os

DEBUG = True
SECRET_KEY = 'blah-blah-blah'

SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
SQLALCHEMY_ECHO = True
SQLALCHEMY_TRACK_MODIFICATIONS = False

SERVER_NAME = os.environ.get('SERVER_NAME', None)
