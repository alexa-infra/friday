import os

this_dir = os.path.dirname(os.path.abspath(__file__))

DEBUG = True
SECRET_KEY = 'blah-blah-blah'

db_path = os.path.join(this_dir, 'database.sqlite')
SQLALCHEMY_DATABASE_URI = 'sqlite://{}'.format(db_path)
SQLALCHEMY_ECHO = True
SQLALCHEMY_TRACK_MODIFICATIONS = False

SERVER_NAME = os.environ.get('SERVER_NAME', None)
