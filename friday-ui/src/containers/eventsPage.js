import React from 'react';
import { connect } from 'react-redux';
import { Calendar } from '../components';
import EditModal, { NewEventModal } from '../components/eventEditor';
import { getEvents, createEvent, createAction } from '../actions';
import { mapEventList, mapEventEdit, mapEventNew } from '../selectors';
import { Actions } from '../constants';


class EventsPageContainer extends React.Component {
  componentDidMount() {
    this.props.initCalendar(this.props.firstDay, this.props.lastDay);
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
    initCalendar: (firstDay, lastDay) => dispatch(getEvents(firstDay, lastDay)),
    showEditNew: item => dispatch(createAction(Actions.EVENTS_SHOW_EDIT_NEW, item)),
  }
};

const mapDispatchEdit = dispatch => {
  return {
    hideEdit: item => dispatch(createAction(Actions.EVENTS_HIDE_EDIT)),
    createNew: item => dispatch(createEvent(item)),
  }
}

let EventsEditContainer = props => (
  <EditModal {...props} />
)
EventsEditContainer = connect(mapEventEdit, mapDispatchEdit)(EventsEditContainer);

let NewEventContainer = props => (
  <NewEventModal {...props} />
)
NewEventContainer = connect(mapEventNew, mapDispatchEdit)(NewEventContainer);

export default connect(mapEventList, mapDispatchList)(EventsPageContainer);
