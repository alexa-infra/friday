"""
  /todo POST
  /todo/remove POST
  /todo/<itemid> GET, PUT, PATCH, DELETE
  /todo/<itemid>/items GET
  /todo/root/items GET
  /todo/focus/items GET
  /todo/trash/items GET
"""
import datetime

import flask
from sqlalchemy import or_

from ..models import TodoItem as TodoItemModel
from ..models import db
from ..schemas import TodoItem as TodoItemSchema
from .base import BaseView, use_args
from .utils import get_or_404

five_days = datetime.timedelta(days=5)


def now():
    return datetime.datetime.utcnow()


class TodoItemCreate(BaseView):
    route_base = "/todo"

    @use_args(TodoItemSchema(), location="json")
    def post(self, args):  # pylint: disable=no-self-use
        if args["parent_id"]:
            parent = get_or_404(TodoItemModel, args["parent_id"])
            if not parent.folder:
                flask.abort(400)
        obj = TodoItemModel.create(**args)
        return TodoItemSchema.jsonify(obj), 201


class TodoItemBulkRemove(BaseView):
    route_base = "/todo/remove"

    def post(self):  # pylint: disable=no-self-use
        raise NotImplementedError


class TodoItemCRUD(BaseView):
    route_base = "/todo/<int:itemid>"

    def get(self, itemid):  # pylint: disable=no-self-use
        obj = get_or_404(TodoItemModel, itemid)
        return TodoItemSchema.jsonify(obj), 200

    @use_args(TodoItemSchema(), location="json")
    def put(self, args, itemid):  # pylint: disable=no-self-use
        obj = get_or_404(TodoItemModel, itemid)
        if args["parent_id"]:
            parent = get_or_404(TodoItemModel, args["parent_id"])
            if not parent.folder:
                flask.abort(400)
        obj.update(**args)
        return TodoItemSchema.jsonify(obj), 200

    @use_args(TodoItemSchema(partial=True), location="json")
    def patch(self, args, itemid):  # pylint: disable=no-self-use
        obj = get_or_404(TodoItemModel, itemid)
        if "parent_id" in args and args["parent_id"]:
            parent = get_or_404(TodoItemModel, args["parent_id"])
            if not parent.folder:
                flask.abort(400)
        obj.update(**args)
        return TodoItemSchema.jsonify(obj), 200

    def delete(self, itemid):  # pylint: disable=no-self-use
        obj = get_or_404(TodoItemModel, itemid)
        obj.delete()
        return {}, 204


class TodoListItems(BaseView):
    route_base = "/todo/<int:itemid>/items"

    def get(self, itemid):  # pylint: disable=no-self-use
        obj = get_or_404(TodoItemModel, itemid)
        if not obj.folder:
            flask.abort(404)
        items = (
            db.query(TodoItemModel)
            .filter(TodoItemModel.parent_id == obj.id)
            .order_by(TodoItemModel.order.asc(), TodoItemModel.updated.desc())
            .all()
        )
        return TodoItemSchema.jsonify(items), 200


class TodoRootItems(BaseView):
    route_base = "/todo/root/items"

    def get(self):  # pylint: disable=no-self-use
        items = (
            db.query(TodoItemModel)
            .filter(TodoItemModel.parent_id.is_(None))
            .order_by(TodoItemModel.order.asc(), TodoItemModel.updated.desc())
            .all()
        )
        return TodoItemSchema.jsonify(items), 200


class TodoFocusItems(BaseView):
    route_base = "/todo/focus/items"

    def get(self):  # pylint: disable=no-self-use
        items = (
            db.query(TodoItemModel)
            .filter(or_(TodoItemModel.focus, TodoItemModel.dueto < now() + five_days))
            .order_by(TodoItemModel.updated.desc())
            .all()
        )
        return TodoItemSchema.jsonify(items), 200


class TodoTrashItems(BaseView):
    route_base = "/todo/trash/items"

    def get(self):  # pylint: disable=no-self-use
        items = (
            db.query(TodoItemModel)
            .filter(or_(TodoItemModel.deleted, TodoItemModel.done))
            .order_by(TodoItemModel.updated.desc())
            .all()
        )
        return TodoItemSchema.jsonify(items), 200


def make_root_list(listid):
    return {
        "id": listid,
        "created": None,
        "updated": None,
        "deleted": False,
        "parent_id": None,
        "name": listid,
        "description": "",
        "order": 0,
        "dueto": None,
        "done": False,
        "focus": False,
        "is_root": True,
    }


class TodoRoot(BaseView):
    route_base = "/todo/root"

    def get(self):  # pylint: disable=no-self-use
        return flask.jsonify(make_root_list("root")), 200


class TodoFocus(BaseView):
    route_base = "/todo/focus"

    def get(self):  # pylint: disable=no-self-use
        return flask.jsonify(make_root_list("focus")), 200


class TodoTrash(BaseView):
    route_base = "/todo/trash"

    def get(self):  # pylint: disable=no-self-use
        return flask.jsonify(make_root_list("trash")), 200
