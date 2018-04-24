from webargs.flaskparser import use_args
from . import api, BaseView
from ..models import db
from ..models.link import Link as LinkModel
from ..schemas.link import Link as LinkSchema


class LinkListView(BaseView):
    route_base = '/links'
    methods = ['GET', 'POST',]

    def get(self):
        objects = LinkModel.query.all()
        return LinkSchema.jsonify(objects, many=True), 200

    @use_args(LinkSchema())
    def post(self, args):
        obj = LinkModel(**args)
        db.session.add(obj)
        db.session.commit()
        return LinkSchema.jsonify(obj), 201


class LinkItemView(BaseView):
    route_base = '/links/<int:id>'
    methods = ['GET', 'PUT', 'DELETE']

    def get(self, id):
        obj = LinkModel.query.get_or_404(id)
        return LinkSchema.jsonify(obj), 200

    @use_args(LinkSchema())
    def put(self, args, id):
        obj = LinkModel.query.get_or_404(id)
        obj.update(**args)
        db.session.add(obj)
        db.session.commit()
        return LinkSchema.jsonify(obj), 200

    def delete(self, id):
        obj = LinkModel.query.get_or_404(id)
        db.session.delete(obj)
        db.session.commit()
        return '', 204


LinkListView.register(api, 'link_list')
LinkItemView.register(api, 'link_item')
