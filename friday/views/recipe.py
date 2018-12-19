from webargs.flaskparser import use_args
from flask_jwt_extended import jwt_required
from . import api, BaseView
from ..models import db
from ..models import Recipe as RecipeModel
from ..schemas import Recipe as RecipeSchema


class RecipeListView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/recipes'
    decorators = (jwt_required,)

    def get(self):
        objects = RecipeModel.query_list().all()
        return RecipeSchema.jsonify(objects), 200

    @use_args(RecipeSchema())
    def post(self, args):
        obj = RecipeModel.new(**args)
        db.session.add(obj)
        db.session.commit()
        return RecipeSchema.jsonify(obj), 200


class RecipeItemView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/recipes/<int:id>'
    decorators = (jwt_required,)

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = RecipeModel.query_list().get_or_404(id)
        return RecipeSchema.jsonify(obj), 200

    @use_args(RecipeSchema())
    def put(self, args, id):  # pylint: disable=redefined-builtin
        obj = RecipeModel.query_list().get_or_404(id)
        obj.update(**args)
        db.session.add(obj)
        db.session.commit()
        return RecipeSchema.jsonify(obj), 200

    def delete(self, id):  # pylint: disable=redefined-builtin
        obj = RecipeModel.query_list().get_or_404(id)
        db.session.delete(obj)
        db.session.commit()
        return '', 204


RecipeListView.register(api, 'recipe_list')
RecipeItemView.register(api, 'recipe_item')
