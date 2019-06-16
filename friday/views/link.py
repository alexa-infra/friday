from flask import redirect
from webargs.flaskparser import use_args, use_kwargs
from flask_jwt_extended import jwt_required
from . import BaseView
from ..models.link import Link as LinkModel
from ..schemas.link import Link as LinkSchema
from .utils import pagination_args


class LinkListView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/links'
    decorators = (jwt_required,)

    @use_kwargs(pagination_args)
    def get(self, page=1, per_page=10):
        pagination = (
            LinkModel.query.order_by(LinkModel.last_access.desc())
            .paginate(page, per_page))
        return LinkSchema.jsonify(pagination), 200

    @use_args(LinkSchema())
    def post(self, args):
        obj = LinkModel.create(**args)
        return LinkSchema.jsonify(obj), 201


class LinkItemView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/links/<int:id>'
    decorators = (jwt_required,)

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = LinkModel.get_or_404(id)
        return LinkSchema.jsonify(obj), 200

    @use_args(LinkSchema())
    def put(self, args, id):  # pylint: disable=redefined-builtin
        obj = LinkModel.get_or_404(id)
        obj.update(**args)
        return LinkSchema.jsonify(obj), 200

    def delete(self, id):  # pylint: disable=redefined-builtin
        obj = LinkModel.get_or_404(id)
        obj.delete()
        return '', 204


class LinkRedirectView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/links/<int:id>/redirect'
    # decorators = (jwt_required,)

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = LinkModel.get_or_404(id)
        obj.touch()
        return redirect(obj.url)
