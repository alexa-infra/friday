import click
from flask.cli import FlaskGroup


@click.group(cls=FlaskGroup, add_default_commands=False)
def cli():
    pass

if __name__ == '__main__':
    cli()
