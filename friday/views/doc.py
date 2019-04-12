from flask import request, abort
from webargs.flaskparser import use_args
from flask_jwt_extended import jwt_required
from . import BaseView
from ..models import db
from ..models import Doc as DocModel, Tag as TagModel
from ..schemas import Doc as DocSchema, Tag as TagSchema


class DocListView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/docs'
    decorators = (jwt_required,)

    def get(self):
        objects = DocModel.query_list().all()
        return DocSchema.jsonify(objects), 200

    @use_args(DocSchema())
    def post(self, args):
        obj = DocModel.new(**args)
        db.session.add(obj)
        db.session.commit()
        return DocSchema.jsonify(obj), 200


class DocItemView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/docs/<int:id>'
    decorators = (jwt_required,)

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = DocModel.query_list().get_or_404(id)
        return DocSchema.jsonify(obj), 200

    @use_args(DocSchema())
    def put(self, args, id):  # pylint: disable=redefined-builtin
        obj = DocModel.query_list().get_or_404(id)
        obj.update(**args)
        db.session.add(obj)
        db.session.commit()
        return DocSchema.jsonify(obj), 200

    def delete(self, id):  # pylint: disable=redefined-builtin
        obj = DocModel.query_list().get_or_404(id)
        db.session.delete(obj)
        db.session.commit()
        return '', 204


class DocTextView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/docs/<int:id>/text'
    decorators = (jwt_required,)

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = DocModel.query.get_or_404(id)
        headers = {'Content-Type': 'text/plain'}
        return obj.text if obj.text else '', 200, headers

    def put(self, id):  # pylint: disable=redefined-builtin
        obj = DocModel.query.get_or_404(id)
        if request.content_type != 'text/plain':
            abort(415)
        obj.text = request.data
        db.session.add(obj)
        db.session.commit()
        headers = {'Content-Type': 'text/plain'}
        return obj.text, 200, headers


class DocHtmlView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/docs/<int:id>/html'
    decorators = (jwt_required,)

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = DocModel.query.get_or_404(id)
        headers = {'Content-Type': 'text/html'}
        return obj.html, 200, headers


class TagListView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/tags'
    decorators = (jwt_required,)

    def get(self):
        objects = TagModel.query.all()
        return TagSchema.jsonify(objects), 200
