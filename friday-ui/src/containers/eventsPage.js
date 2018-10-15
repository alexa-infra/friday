import React from 'react';
import { connect } from 'react-redux';
import { Calendar } from '../components';
import { EditEventModal, NewEventModal } from '../components/eventEditor';
import { events, createAction } from '../actions';
import { mapEventList, mapEventEdit, mapEventNew } from '../selectors';
import { Actions } from '../constants';


class EventsPageContainer extends React.Component {
  componentDidMount() {
    this.props.initCalendar();
  }
  render() {
    return (
      <div>
        <Calendar {...this.props} />
        <EventsEditContainer onSubmit={values => this.props.update(values)} />
        <NewEventContainer onSubmit={values => this.props.createNew(values)} />
      </div>
    );
  }
}

const mapDispatchList = dispatch => {
  const getEvents = () => dispatch(events.getEvents());
  return {
    showEdit: item => dispatch(createAction(Actions.EVENTS_SHOW_EDIT, item)),
    showEditNew: item => dispatch(createAction(Actions.EVENTS_SHOW_EDIT_NEW, item)),
    initCalendar: () => dispatch(events.currentMonth()).then(getEvents),
    updateCalendar: getEvents,
    nextMonth: () => dispatch(events.nextMonth()).then(getEvents),
    prevMonth: () => dispatch(events.prevMonth()).then(getEvents),
    createNew: item => dispatch(events.createEvent(item)).then(getEvents),
    update: item => dispatch(events.updateEvent(item)).then(getEvents),
  }
};

const mapDispatchEdit = dispatch => {
  const getEvents = () => dispatch(events.getEvents());
  return {
    hideEdit: item => dispatch(createAction(Actions.EVENTS_HIDE_EDIT)),
    createNew: item => dispatch(events.createEvent(item)).then(getEvents),
    update: item => dispatch(events.updateEvent(item)).then(getEvents),
    delete: item => dispatch(events.deleteEvent(item)).then(getEvents),
    repeatIn: item => dispatch(events.repeatEvent(item)).then(getEvents),
  }
}

const EventsEditContainer = connect(mapEventEdit, mapDispatchEdit)(EditEventModal);
const NewEventContainer = connect(mapEventNew, mapDispatchEdit)(NewEventModal);

export default connect(mapEventList, mapDispatchList)(EventsPageContainer);
