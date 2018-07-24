from click import CommandCollection
from .user import user

commands = CommandCollection(sources=[user, ])
