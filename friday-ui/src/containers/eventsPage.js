import React from 'react';
import { connect } from 'react-redux';
import { Calendar } from '../components';
import EditModal from '../components/eventEditor';
import { getEvents, createAction } from '../actions';
import { mapEventList, mapEventEdit } from '../selectors';
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
      </div>
    );
  }
}

const mapDispatchList = dispatch => {
  return {
    showEdit: item => dispatch(createAction(Actions.EVENTS_SHOW_EDIT, item)),
    initCalendar: (firstDay, lastDay) => dispatch(getEvents(firstDay, lastDay)),
  }
};

const mapDispatchEdit = dispatch => {
  return {
    hideEdit: item => dispatch(createAction(Actions.EVENTS_HIDE_EDIT)),
  }
}

let EventsEditContainer = props => (
  <EditModal {...props} />
)
EventsEditContainer = connect(mapEventEdit, mapDispatchEdit)(EventsEditContainer);

export default connect(mapEventList, mapDispatchList)(EventsPageContainer);
