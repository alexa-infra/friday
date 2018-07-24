from flask import redirect
from webargs import fields
from webargs.flaskparser import use_args, use_kwargs
from flask_jwt_extended import jwt_required
from . import api, BaseView
from ..models import db
from ..models.link import Link as LinkModel
from ..schemas.link import Link as LinkSchema


def validate_per_page(val):
    if val <= 0 or val > 100:
        return False
    return True


def validate_page(val):
    if val < 0:
        return False
    return True


pagination_args = {
    'page': fields.Int(missing=1, location='query',
                       validate=validate_page),
    'per_page': fields.Int(missing=10, location='query',
                           validate=validate_per_page),
}


class LinkListView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/links'
    decorators = (jwt_required,)

    @use_kwargs(pagination_args)
    def get(self, page, per_page):
        pagination = (
            LinkModel.query.order_by(LinkModel.last_access.desc())
            .paginate(page, per_page))
        return LinkSchema.jsonify(pagination), 200

    @use_args(LinkSchema())
    def post(self, args):
        obj = LinkModel(**args)
        db.session.add(obj)
        db.session.commit()
        return LinkSchema.jsonify(obj), 201


class LinkItemView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/links/<int:id>'
    decorators = (jwt_required,)

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = LinkModel.query.get_or_404(id)
        return LinkSchema.jsonify(obj), 200

    @use_args(LinkSchema())
    def put(self, args, id):  # pylint: disable=redefined-builtin
        obj = LinkModel.query.get_or_404(id)
        obj.update(**args)
        db.session.add(obj)
        db.session.commit()
        return LinkSchema.jsonify(obj), 200

    def delete(self, id):  # pylint: disable=redefined-builtin
        obj = LinkModel.query.get_or_404(id)
        db.session.delete(obj)
        db.session.commit()
        return '', 204


class LinkRedirectView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/links/<int:id>/redirect'
    # decorators = (jwt_required,)

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = LinkModel.query.get_or_404(id)
        obj.touch()
        db.session.add(obj)
        db.session.commit()
        return redirect(obj.url)


LinkListView.register(api, 'link_list')
LinkItemView.register(api, 'link_item')
LinkRedirectView.register(api, 'link_redirect')
