import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import { FormFields } from './editForm';
import {
  getEvents, hideNew, createEvent, selectNewDialog,
} from '../../features/events';

let NewEventForm = (props) => {
  const {
    show, hideEdit, item: newItem, onSubmit,
  } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
      <Form
        enableReinitialize
        initialValues={newItem}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
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
  selectNewDialog,
  (dispatch) => {
    const reload = () => dispatch(getEvents());
    const hide = () => dispatch(hideNew());
    return {
      onSubmit: (values) => dispatch(createEvent(values)).then(reload).then(hide),
      hideEdit: hide,
    };
  },
)(NewEventForm);

export default NewEventForm;
