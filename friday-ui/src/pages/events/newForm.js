import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { FormFields } from './editForm';
import { events, createAction } from '../../actions';
import { Actions } from '../../constants';


let NewEventForm = props => {
  const { handleSubmit, show, hideEdit } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormFields />
        </Modal.Body>
        <Modal.Footer>
          <button type="submit">
            Create
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

NewEventForm = reduxForm({
  form: 'new-event',
  enableReinitialize: true,
})(NewEventForm);

NewEventForm = connect(
  state => ({
    initialValues: { date: state.events.newEventDate },
    show: state.events.newEventDate !== null,
  }),
  dispatch => ({
    onSubmit: values => dispatch(events.createEvent(values)).then(
      () => dispatch(events.getEvents())
    ),
    hideEdit: () => dispatch(createAction(Actions.EVENTS_HIDE_EDIT)),
  })
)(NewEventForm);

export default NewEventForm;
