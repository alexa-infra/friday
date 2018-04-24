#!/usr/bin/env python
import click
from flask.cli import FlaskGroup
from friday.commands import commands


def create_app(_=None):
    from friday import make_app
    return make_app()

cli = FlaskGroup(add_default_commands=False, create_app=create_app)
for src in commands.sources:
    cli.add_command(src)

if __name__ == '__main__':
    cli()
