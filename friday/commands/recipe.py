import os
import click
from flask.cli import AppGroup
from friday import storage
from friday.models import db, Recipe, RecipeImage
from friday.schemas import Recipe as RecipeSchema


recipe_group = AppGroup('recipe')


@recipe_group.command('new')
@click.argument('itemname')
@click.option('--name', '-n', multiple=True)
@click.option('--tag', '-t', multiple=True)
def make_recipe(itemname, name, tag):
    '''Create new recipe'''
    r = Recipe.new(
        name=itemname,
        namesList=name,
        tagsList=tag,
    )
    db.session.add(r)
    db.session.commit()
    click.echo(RecipeSchema.jsonify(r).get_data())


@recipe_group.command('get')
@click.argument('itemid')
def get_recipe(itemid):
    '''Get a recipe'''
    r = Recipe.query_list().get(itemid)
    if not r:
        click.echo('Not found')
    else:
        click.echo(RecipeSchema.jsonify(r).get_data())


@recipe_group.command('update')
@click.argument('itemid')
@click.argument('itemname')
@click.option('--name', '-n', multiple=True)
@click.option('--tag', '-t', multiple=True)
def update_recipe(itemid, itemname, name, tag):
    '''Update new recipe'''
    r = Recipe.query_list().get(itemid)
    if not r:
        click.echo('Not found')
    r.update(
        name=itemname,
        namesList=name,
        tagsList=tag,
    )
    db.session.add(r)
    db.session.commit()
    click.echo(RecipeSchema.jsonify(r).get_data())

@recipe_group.command('delete')
@click.argument('itemid')
def delete_recipe(itemid):
    '''Get a recipe'''
    r = Recipe.query_list().get(itemid)
    if not r:
        click.echo('Not found')
    db.session.delete(r)
    db.session.commit()
    click.echo('Done')

@recipe_group.command('add-image')
@click.argument('itemid')
@click.argument('imageurl')
def add_image(itemid, imageurl):
    '''Add image'''
    r = Recipe.query_list().get(itemid)
    if not r:
        click.echo('Not found')
    ri = RecipeImage.new(
        recipe=r,
        url=imageurl
    )
    db.session.add(ri)
    db.session.commit()
    click.echo(RecipeSchema.jsonify(r).get_data())


@recipe_group.command('remove-image')
@click.argument('itemid')
@click.argument('filename')
def remove_image(itemid, filename):
    '''Add image'''
    r = Recipe.query_list().get(itemid)
    if not r:
        click.echo('Not found')
    ri = next((i for i in r.images if i.filename == filename), None)
    if not ri:
        click.echo('Image not found')
    storage.remove(filename)
    db.session.delete(ri)
    db.session.commit()
    click.echo('Done')