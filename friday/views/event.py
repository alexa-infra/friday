from datetime import timedelta
from webargs import fields
from webargs.flaskparser import use_args, use_kwargs
from flask_jwt_extended import jwt_required
from . import api, BaseView
from ..models import db
from ..models.event import Event as EventModel
from ..schemas.event import Event as EventSchema, EventMatch


eventlist_args = {
    'fromdate': fields.Date(missing=None, location='query'),
    'todate': fields.Date(missing=None, location='query'),
}


class EventListView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/events'
    decorators = (jwt_required,)

    @use_kwargs(eventlist_args)
    def get(self, fromdate, todate):
        if fromdate is not None and todate is not None:
            matches = EventModel.get_between(fromdate, todate)
            return EventMatch.jsonify(matches), 200
        else:
            objects = EventModel.query_all().all()
        return EventSchema.jsonify(objects), 200

    @use_args(EventSchema())
    def post(self, args):
        obj = EventModel.new(**args)
        db.session.add(obj)
        db.session.commit()
        return EventSchema.jsonify(obj), 201


class EventItemView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/events/<int:id>'
    decorators = (jwt_required,)

    def get(self, id):  # pylint: disable=redefined-builtin
        obj = EventModel.query.get_or_404(id)
        return EventSchema.jsonify(obj), 200

    @use_args(EventSchema())
    def put(self, args, id):  # pylint: disable=redefined-builtin
        obj = EventModel.query.get_or_404(id)
        obj.update(**args)
        db.session.add(obj)
        db.session.commit()
        return EventSchema.jsonify(obj), 200

    def delete(self, id):  # pylint: disable=redefined-builtin
        obj = EventModel.query.get_or_404(id)
        db.session.delete(obj)
        db.session.commit()
        return '', 204


repeat_args = {
    'days': fields.Int(required=True),
}


class EventRepeatView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/events/<int:id>/repeat'
    decorators = (jwt_required,)

    @use_kwargs(repeat_args)
    def post(self, id, days):  # pylint: disable=redefined-builtin
        obj = EventModel.query.get_or_404(id)
        if obj.repeat is not None:
            return '', 400
        dt = obj.date + timedelta(days=days)
        new_obj = EventModel.new(name=obj.name, icon=obj.icon,
                                 date=dt)
        db.session.add(new_obj)
        db.session.commit()
        return EventSchema.jsonify(new_obj), 201


EventListView.register(api, 'event_list')
EventItemView.register(api, 'event_item')
EventRepeatView.register(api, 'event_item_repeat')
