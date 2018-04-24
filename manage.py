#!/usr/bin/env python
import click
from flask.cli import FlaskGroup


def create_app(_=None):
    from friday import make_app
    return make_app()

@click.group(cls=FlaskGroup, add_default_commands=False,
             create_app=create_app)
def cli():
    pass

if __name__ == '__main__':
    cli()
