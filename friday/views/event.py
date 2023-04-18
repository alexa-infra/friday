from datetime import timedelta

from webargs import fields

from ..models.event import Event as EventModel
from ..schemas.event import Event as EventSchema
from ..schemas.event import EventMatch
from .base import BaseView, use_args, use_kwargs
from .utils import get_or_404

eventlist_args = {
    "fromdate": fields.Date(required=False),
    "todate": fields.Date(required=False),
}


class EventListView(BaseView):
    # pylint: disable=no-self-use

    route_base = "/events"

    @use_kwargs(eventlist_args, location="query")
    def get(self, fromdate, todate):
        if fromdate and todate:
            matches = EventModel.get_between(fromdate, todate)
            return EventMatch.jsonify(matches), 200
        objects = EventModel.query_all().all()
        return EventSchema.jsonify(objects), 200

    @use_args(EventSchema(), location="json")
    def post(self, args):
        obj = EventModel.create(**args)
        return EventSchema.jsonify(obj), 201


class EventItemView(BaseView):
    # pylint: disable=no-self-use

    route_base = "/events/<int:id>"

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = get_or_404(EventModel, id)
        return EventSchema.jsonify(obj), 200

    @use_args(EventSchema(), location="json")
    def put(self, args, id):  # pylint: disable=redefined-builtin
        obj = get_or_404(EventModel, id)
        obj.update(**args)
        return EventSchema.jsonify(obj), 200

    def delete(self, id):  # pylint: disable=redefined-builtin
        obj = get_or_404(EventModel, id)
        obj.delete()
        return "", 204


repeat_args = {
    "days": fields.Int(required=True),
}


class EventRepeatView(BaseView):
    # pylint: disable=no-self-use

    route_base = "/events/<int:id>/repeat"

    @use_kwargs(repeat_args, location="json")
    def post(self, id, days):  # pylint: disable=redefined-builtin
        obj = get_or_404(EventModel, id)
        if obj.repeat is not None:
            return "", 400
        dt = obj.date + timedelta(days=days)
        new_obj = EventModel.create(name=obj.name, icon=obj.icon, date=dt)
        return EventSchema.jsonify(new_obj), 201
