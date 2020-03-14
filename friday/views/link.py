from flask import redirect
from . import BaseView, use_args, use_kwargs
from ..models.link import Link as LinkModel
from ..models import paginate
from ..schemas.link import Link as LinkSchema
from .utils import pagination_args, get_or_404


class LinkListView(BaseView):
    # pylint: disable=no-self-use

    route_base = "/links"

    @use_kwargs(pagination_args, location="query")
    def get(self, page=1, per_page=10):
        query = LinkModel.query.order_by(LinkModel.last_access.desc())
        pagination = paginate(query, page, per_page)
        return LinkSchema.jsonify(pagination), 200

    @use_args(LinkSchema(), location="json")
    def post(self, args):
        obj = LinkModel.create(**args)
        return LinkSchema.jsonify(obj), 201


class LinkItemView(BaseView):
    # pylint: disable=no-self-use

    route_base = "/links/<int:id>"

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = get_or_404(LinkModel, id)
        return LinkSchema.jsonify(obj), 200

    @use_args(LinkSchema(), location="json")
    def put(self, args, id):  # pylint: disable=redefined-builtin
        obj = get_or_404(LinkModel, id)
        obj.update(**args)
        return LinkSchema.jsonify(obj), 200

    def delete(self, id):  # pylint: disable=redefined-builtin
        obj = get_or_404(LinkModel, id)
        obj.delete()
        return "", 204


class LinkRedirectView(BaseView):
    # pylint: disable=no-self-use

    route_base = "/links/<int:id>/redirect"

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = get_or_404(LinkModel, id)
        obj.touch()
        return redirect(obj.url)
