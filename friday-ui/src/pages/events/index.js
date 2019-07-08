import React from 'react';
import { connect } from 'react-redux';
import Calendar from './calendar';
import EditEventModal from './editForm';
import NewEventModal from './newForm';
import { withOnLoad } from '../../components';
import { events } from '../../actions';


let EventsPage = () => (
  <div className="row justify-content-center">
    <div className="col col-md-10">
      <Calendar />
      <EditEventModal />
      <NewEventModal />
    </div>
  </div>
);

EventsPage = withOnLoad(EventsPage, props => props.initCalendar());

EventsPage = connect(
  null,
  dispatch => {
    const getEvents = () => dispatch(events.getEvents());
    return {
      initCalendar: () => dispatch(events.currentMonth()).then(getEvents),
    };
  }
)(EventsPage);

export default EventsPage;
