import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-final-form'
import { connect } from 'react-redux';
import { FormFields } from './editForm';
import { events } from '../../actions';


let NewEventForm = props => {
  const { show, hideEdit, newItem, onSubmit } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
      <Form
        enableReinitialize={true}
        initialValues={newItem}
        onSubmit={onSubmit}>
      {({handleSubmit}) => (
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
      )}
      </Form>
    </Modal>
  );
};

NewEventForm = connect(
  state => ({
    newItem: { date: state.events.newEventDate },
    show: state.events.newEventDate !== null,
  }),
  dispatch => ({
    onSubmit: values => dispatch(events.createEvent(values)).then(
      () => dispatch(events.getEvents())
    ),
    hideEdit: () => dispatch(events.hideEdit()),
  })
)(NewEventForm);

export default NewEventForm;
