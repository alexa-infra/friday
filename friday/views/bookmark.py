from . import BaseView, use_args, use_kwargs
from ..models import Bookmark as BookmarkModel
from ..models import paginate
from ..schemas import Bookmark as BookmarkSchema
from .utils import pagination_args, search_args, get_or_404


class BookmarkListView(BaseView):
    # pylint: disable=no-self-use

    route_base = "/bookmarks"

    @use_kwargs({**pagination_args, **search_args}, location="query")
    def get(self, page=1, per_page=10, search=None):
        query = BookmarkModel.query
        if search:
            search_term = "%{}%".format(search)
            query = query.filter(BookmarkModel.slug.like(search_term))
        query = query.order_by(BookmarkModel.created.desc())
        pagination = paginate(query, page, per_page)
        return BookmarkSchema.jsonify(pagination), 200

    @use_args(BookmarkSchema(), location="json")
    def post(self, args):
        obj = BookmarkModel.create(**args)
        return BookmarkSchema.jsonify(obj), 201


class BookmarkItemView(BaseView):
    # pylint: disable=no-self-use

    route_base = "/bookmarks/<int:id>"

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = get_or_404(BookmarkModel, id)
        return BookmarkSchema.jsonify(obj), 200

    @use_args(BookmarkSchema(), location="json")
    def put(self, args, id):  # pylint: disable=redefined-builtin
        obj = get_or_404(BookmarkModel, id)
        obj.update(**args)
        return BookmarkSchema.jsonify(obj), 200

    def delete(self, id):  # pylint: disable=redefined-builtin
        obj = get_or_404(BookmarkModel, id)
        obj.delete()
        return "", 204


class BookmarkFavoriteListView(BaseView):
    # pylint: disable=no-self-use

    route_base = "/bookmarks/favorite"

    @use_kwargs({**pagination_args, **search_args}, location="query")
    def get(self, page=1, per_page=10, search=None):
        query = BookmarkModel.query.filter(BookmarkModel.favorite)
        if search:
            search_term = "%{}%".format(search)
            query = query.filter(BookmarkModel.slug.like(search_term))
        query = query.order_by(BookmarkModel.created.desc())
        pagination = paginate(query, page, per_page)
        return BookmarkSchema.jsonify(pagination), 200
