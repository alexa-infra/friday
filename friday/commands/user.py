import click
from flask.cli import AppGroup

from friday.models import User
from friday.utils import get_random_string

user = AppGroup("user")


@user.command("new")
@click.argument("email")
@click.option("--password")
def make_user(email, password):
    """Create new user"""
    if not password:
        password = get_random_string()
        click.echo("New password: {}".format(password))
    User.create(email=email, password=password)


@user.command("change_password")
@click.argument("user_id")
@click.option("--password")
def change_password(user_id, password):
    """Change user password"""
    usr = User.get(user_id)
    if not usr:
        click.echo("Not found")
        return
    if not password:
        password = get_random_string()
        click.echo("New password: {}".format(password))
    usr.update(password=password)


@user.command("list")
def list_users():
    users = User.query.all()
    for usr in users:
        click.echo("User ID:{} Email:{}".format(usr.id, usr.email))
