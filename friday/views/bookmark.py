from webargs import fields
from webargs.flaskparser import use_args, use_kwargs
from flask_jwt_extended import jwt_required
from slugify import slugify
from . import api, BaseView
from ..models import db
from ..models import Bookmark as BookmarkModel
from ..schemas import Bookmark as BookmarkSchema
from .link import pagination_args


filter_args = {
    'search': fields.Str(location='query'),
}

class BookmarkListView(BaseView):
    route_base = '/bookmarks'
    decorators = (jwt_required,)

    @use_kwargs(pagination_args)
    @use_kwargs(filter_args)
    def get(self, page, per_page, search):
        query = BookmarkModel.query
        search = slugify(search, separator=' ') if search else None
        if search:
            search_term = '%{}%'.format(search)
            query = query.filter(
                BookmarkModel.title.like(search_term))
        query = query.order_by(BookmarkModel.created.desc())
        pagination = query.paginate(page, per_page)
        return BookmarkSchema.jsonify(pagination), 200

    @use_args(BookmarkSchema())
    def post(self, args):
        obj = BookmarkModel.new(**args)
        db.session.add(obj)
        db.session.commit()
        return BookmarkSchema.jsonify(obj), 201


class BookmarkItemView(BaseView):
    route_base = '/bookmarks/<int:id>'
    decorators = (jwt_required,)

    def get(self, id):
        obj = BookmarkModel.query.get_or_404(id)
        return BookmarkSchema.jsonify(obj), 200

    @use_args(BookmarkSchema())
    def put(self, args, id):
        obj = BookmarkModel.query.get_or_404(id)
        obj.update(**args)
        db.session.add(obj)
        db.session.commit()
        return BookmarkSchema.jsonify(obj), 200

    def delete(self, id):
        obj = BookmarkModel.query.get_or_404(id)
        db.session.delete(obj)
        db.session.commit()
        return '', 204


BookmarkListView.register(api, 'bookmark_list')
BookmarkItemView.register(api, 'bookmark_item')
