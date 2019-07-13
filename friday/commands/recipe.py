import click
from flask.cli import AppGroup
from friday import storage
from friday.models import Recipe, RecipeImage
from friday.schemas import Recipe as RecipeSchema


recipe_group = AppGroup('recipe')


@recipe_group.command('new')
@click.argument('itemname')
@click.option('--name', '-n', multiple=True)
@click.option('--tag', '-t', multiple=True)
def make_recipe(itemname, name, tag):
    '''Create new recipe'''
    r = Recipe.create(
        name=itemname,
        namesList=name,
        tagsList=tag,
    )
    click.echo(RecipeSchema.jsonify(r).get_data())


@recipe_group.command('get')
@click.argument('itemid')
def get_recipe(itemid):
    '''Get a recipe'''
    r = Recipe.query_list().get(itemid)
    if not r:
        click.echo('Not found')
        return
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
        return
    r.update(
        name=itemname,
        namesList=name,
        tagsList=tag,
    )
    click.echo(RecipeSchema.jsonify(r).get_data())


@recipe_group.command('delete')
@click.argument('itemid')
def delete_recipe(itemid):
    '''Get a recipe'''
    r = Recipe.query_list().get(itemid)
    if not r:
        click.echo('Not found')
        return
    r.delete()
    click.echo('Done')


@recipe_group.command('add-image')
@click.argument('itemid')
@click.argument('imageurl')
def add_image(itemid, imageurl):
    '''Add image'''
    r = Recipe.query_list().get(itemid)
    if not r:
        click.echo('Not found')
        return
    RecipeImage.create(
        recipe=r,
        url=imageurl
    )
    click.echo(RecipeSchema.jsonify(r).get_data())


@recipe_group.command('remove-image')
@click.argument('itemid')
@click.argument('filename')
def remove_image(itemid, filename):
    '''Remove image'''
    r = Recipe.query_list().get(itemid)
    if not r:
        click.echo('Not found')
        return
    ri = next((i for i in r.images if i.filename == filename), None)
    if not ri:
        click.echo('Image not found')
        return
    storage.delete(filename)
    ri.delete()
    click.echo('Done')
