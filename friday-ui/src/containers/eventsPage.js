import React from 'react';
import { connect } from 'react-redux';
import { Calendar } from '../components';
import EditModal, { NewEventModal } from '../components/eventEditor';
import { events, createAction } from '../actions';
import { mapEventList, mapEventEdit, mapEventNew } from '../selectors';
import { Actions } from '../constants';


class EventsPageContainer extends React.Component {
  componentDidMount() {
    this.props.updateCalendar();
  }
  render() {
    return (
      <div>
        <Calendar {...this.props} />
        <EventsEditContainer />
        <NewEventContainer />
      </div>
    );
  }
}

const mapDispatchList = dispatch => {
  return {
    showEdit: item => dispatch(createAction(Actions.EVENTS_SHOW_EDIT, item)),
    updateCalendar: () => dispatch(events.getEvents()),
    showEditNew: item => dispatch(createAction(Actions.EVENTS_SHOW_EDIT_NEW, item)),
  }
};

const mapDispatchEdit = dispatch => {
  return {
    hideEdit: item => dispatch(createAction(Actions.EVENTS_HIDE_EDIT)),
    createNew: item => dispatch(events.createEvent(item)),
    update: item => dispatch(events.updateEvent(item)),
    delete: item => dispatch(events.deleteEvent(item)),
  }
}

const EventsEditContainer = connect(mapEventEdit, mapDispatchEdit)(EditModal);
const NewEventContainer = connect(mapEventNew, mapDispatchEdit)(NewEventModal);

export default connect(mapEventList, mapDispatchList)(EventsPageContainer);
