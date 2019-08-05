from flask import request, abort
from webargs.flaskparser import use_args, use_kwargs
from . import BaseView
from ..models import Doc as DocModel, Tag as TagModel, DocTag
from ..models import paginate
from ..schemas import Doc as DocSchema, Tag as TagSchema, TagCloud
from .utils import tag_args, pagination_args


class DocListView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/docs'

    @use_kwargs(tag_args)
    @use_kwargs(pagination_args)
    def get(self, page=1, per_page=10, tag=None):
        query = DocModel.query_list()
        if tag:
            query = query.join(DocTag)
            query = query.join(TagModel)
            query = query.filter(TagModel.name == tag)
        query = query.order_by(DocModel.updated.desc())
        pagination = paginate(query, page, per_page)
        return DocSchema.jsonify(pagination), 200

    @use_args(DocSchema())
    def post(self, args):
        obj = DocModel.create(**args)
        return DocSchema.jsonify(obj), 200


class DocItemView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/docs/<int:id>'

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = DocModel.query_list().get_or_404(id)
        return DocSchema.jsonify(obj), 200

    @use_args(DocSchema())
    def put(self, args, id):  # pylint: disable=redefined-builtin
        obj = DocModel.query_list().get_or_404(id)
        obj.update(**args)
        return DocSchema.jsonify(obj), 200

    def delete(self, id):  # pylint: disable=redefined-builtin
        obj = DocModel.query_list().get_or_404(id)
        obj.delete()
        return '', 204


class DocTextView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/docs/<int:id>/text'

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = DocModel.get_or_404(id)
        headers = {'Content-Type': 'text/plain'}
        return obj.text if obj.text else '', 200, headers

    def put(self, id):  # pylint: disable=redefined-builtin
        obj = DocModel.get_or_404(id)
        if request.content_type != 'text/plain':
            abort(415)
        obj.update(text=request.data)
        headers = {'Content-Type': 'text/plain'}
        return obj.text, 200, headers


class DocHtmlView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/docs/<int:id>/html'

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = DocModel.get_or_404(id)
        headers = {'Content-Type': 'text/html'}
        return obj.html, 200, headers


class DocTagCloudView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/docs/tags'

    def get(self):
        objects = DocModel.tag_cloud()
        return TagCloud.jsonify(objects), 200


class TagListView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/tags'

    def get(self):
        objects = TagModel.query.all()
        return TagSchema.jsonify(objects), 200
