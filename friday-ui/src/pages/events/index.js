import React from 'react';
import { connect } from 'react-redux';
import Calendar from './calendar';
import EditEventModal from './editForm';
import NewEventModal from './newForm';
import { events } from '../../actions';


class EventsPage extends React.Component {
  componentDidMount() {
    this.props.initCalendar();
  }
  render() {
    return (
      <div>
        <Calendar />
        <EditEventModal />
        <NewEventModal />
      </div>
    );
  }
}

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
