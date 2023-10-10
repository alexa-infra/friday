from ..models import Bookmark as BookmarkModel, Tag as TagModel, BookmarkTag
from ..models import paginate
from ..schemas import Bookmark as BookmarkSchema, TagCloud
from .base import BaseView, use_args, use_kwargs
from .utils import get_or_404, pagination_args, search_args, tag_args


class BookmarkListView(BaseView):
    # pylint: disable=no-self-use

    route_base = "/bookmarks"

    @use_kwargs({**pagination_args, **tag_args, **search_args}, location="query")
    def get(self, page=1, per_page=10, search=None, tag=None):
        query = BookmarkModel.query_list()
        if tag:
            query = query.join(BookmarkTag)
            query = query.join(TagModel)
            query = query.filter(TagModel.name == tag)
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


class BookmarkTagCloudView(BaseView):
    # pylint: disable=no-self-use

    route_base = "/bookmarks/tags"

    def get(self):
        objects = BookmarkModel.tag_cloud()
        return TagCloud.jsonify(objects), 200
