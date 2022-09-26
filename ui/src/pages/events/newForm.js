import React from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import { FormFields } from './editForm';
import { Modal, ModalHeader, ModalFooter } from '../../components/modal';
import Button from '../../components/button';
import {
  getEvents, hideNew, createEvent, selectNewDialog,
} from '../../features/events';

let NewEventForm = (props) => {
  const {
    show, hideEdit, item: newItem, onSubmit,
  } = props;
  return (
    <Modal isOpen={show} onRequestClose={hideEdit}>
      <Form
        enableReinitialize
        initialValues={newItem}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ModalHeader onClose={hideEdit}>
              Create event
            </ModalHeader>
            <FormFields />
            <ModalFooter>
              <Button type="submit">
                Create
              </Button>
            </ModalFooter>
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
