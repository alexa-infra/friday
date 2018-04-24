import click
from friday.models import db, User
from friday.utils import get_random_string


@click.group()
def user():
    '''User operations'''
    pass

@user.command('new')
@click.argument('email')
@click.option('--password')
def make_user(email, password):
    '''Create new user'''
    if not password:
        password = get_random_string()
        click.echo('New password: {}'.format(password))
    user = User.new(email, password)
    db.session.add(user)
    db.session.commit()

@user.command('change_password')
@click.argument('user_id')
@click.option('--password')
def change_password(user_id, password):
    '''Change user password'''
    user = User.query.get(user_id)
    if not user:
        click.echo('Not found')
        return
    if not password:
        password = get_random_string()
        click.echo('New password: {}'.format(password))
    user.update(password=password)
    db.session.add(user)
    db.session.commit()
