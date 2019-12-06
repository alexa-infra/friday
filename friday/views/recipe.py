from webargs.flaskparser import use_args
from . import BaseView
from ..models import Recipe as RecipeModel
from ..schemas import Recipe as RecipeSchema
from .utils import get_or_404


class RecipeListView(BaseView):
    # pylint: disable=no-self-use

    route_base = "/recipes"

    def get(self):
        objects = RecipeModel.query_list().all()
        return RecipeSchema.jsonify(objects), 200

    @use_args(RecipeSchema())
    def post(self, args):
        obj = RecipeModel.create(**args)
        return RecipeSchema.jsonify(obj), 200


class RecipeItemView(BaseView):
    # pylint: disable=no-self-use

    route_base = "/recipes/<int:id>"

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = get_or_404(RecipeModel.query_list(), id)
        return RecipeSchema.jsonify(obj), 200

    @use_args(RecipeSchema())
    def put(self, args, id):  # pylint: disable=redefined-builtin
        obj = get_or_404(RecipeModel.query_list(), id)
        obj.update(**args)
        return RecipeSchema.jsonify(obj), 200

    def delete(self, id):  # pylint: disable=redefined-builtin
        obj = get_or_404(RecipeModel.query_list(), id)
        obj.delete()
        return "", 204
