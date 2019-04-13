#!/usr/bin/env python
import click
from flask.cli import FlaskGroup
from friday.commands import commands


settings = {
    'SERVER_NAME': 'http://localhost',
    'JSONIFY_PRETTYPRINT_REGULAR': True,
}

def create_app(_=None):
    from friday import make_app
    return make_app(settings)

cli = FlaskGroup(create_app=create_app)
for src in commands.sources:
    cli.add_command(src)

if __name__ == '__main__':
    cli()
