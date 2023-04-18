from click import CommandCollection

from .recipe import recipe_group
from .user import user

commands = CommandCollection(sources=[user, recipe_group])
