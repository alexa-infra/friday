from datetime import timedelta
from webargs import fields
from webargs.flaskparser import use_args, use_kwargs
from . import BaseView
from ..models.event import Event as EventModel
from ..schemas.event import Event as EventSchema, EventMatch


eventlist_args = {
    'fromdate': fields.Date(required=False, location='query'),
    'todate': fields.Date(required=False, location='query'),
}


class EventListView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/events'

    @use_kwargs(eventlist_args)
    def get(self, fromdate=None, todate=None):
        if fromdate and todate:
            matches = EventModel.get_between(fromdate, todate)
            return EventMatch.jsonify(matches), 200
        objects = EventModel.query_all().all()
        return EventSchema.jsonify(objects), 200

    @use_args(EventSchema())
    def post(self, args):
        obj = EventModel.create(**args)
        return EventSchema.jsonify(obj), 201


class EventItemView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/events/<int:id>'

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = EventModel.get_or_404(id)
        return EventSchema.jsonify(obj), 200

    @use_args(EventSchema())
    def put(self, args, id):  # pylint: disable=redefined-builtin
        obj = EventModel.get_or_404(id)
        obj.update(**args)
        return EventSchema.jsonify(obj), 200

    def delete(self, id):  # pylint: disable=redefined-builtin
        obj = EventModel.get_or_404(id)
        obj.delete()
        return '', 204


repeat_args = {
    'days': fields.Int(required=True),
}


class EventRepeatView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/events/<int:id>/repeat'

    @use_kwargs(repeat_args)
    def post(self, id, days):  # pylint: disable=redefined-builtin
        obj = EventModel.get_or_404(id)
        if obj.repeat is not None:
            return '', 400
        dt = obj.date + timedelta(days=days)
        new_obj = EventModel.create(
            name=obj.name, icon=obj.icon, date=dt)
        return EventSchema.jsonify(new_obj), 201
