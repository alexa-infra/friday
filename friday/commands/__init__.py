from click import CommandCollection
from .user import user
from .recipe import recipe_group

commands = CommandCollection(sources=[user, recipe_group])
