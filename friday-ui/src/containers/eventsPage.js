import React from 'react';
import { connect } from 'react-redux';
import { Calendar } from '../components';
import { getEvents } from '../actions';
import { eventsSelector } from '../selectors';


class EventsPageContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(getEvents(this.props.firstDay, this.props.lastDay));
  }
  render() {
    return <Calendar {...this.props} />
  }
}

export default connect(eventsSelector)(EventsPageContainer);
