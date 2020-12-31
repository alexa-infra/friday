import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalFooter } from '../../components/modal';
import Button from '../../components/button';
import {
  getEvents, hideEdit, updateEvent, repeatEvent, deleteEvent, selectEditDialog,
} from '../../features/events';

const RepeatInDays = (props) => {
  const { values, repeatIn } = props;
  return (
    <>
      <label htmlFor="repeatIn">Repeat In</label>
      <div className="field">
        <Field name="repeatIn" component="input" type="number" />
        <Button type="button" onClick={() => repeatIn(values)}>
          Repeat
        </Button>
      </div>
    </>
  );
};

export const FormFields = () => (
  <>
    <label htmlFor="date">Date</label>
    <Field name="date" component="input" type="text" disabled />

    <label htmlFor="name">Name</label>
    <Field name="name" component="input" type="text" />

    <label htmlFor="icon">Icon</label>
    <Field name="icon" component="input" type="text" />

    <label htmlFor="repeat">Repeat</label>
    <Field name="repeat" component="select">
      <option value="none">No repeat</option>
      <option value="daily">Day</option>
      <option value="weekly">Week</option>
      <option value="biweekly">2 Weeks</option>
      <option value="monthly">Month</option>
      <option value="annually">Year</option>
    </Field>
  </>
);

let EventForm = (props) => {
  const {
    show, hideEdit, item: currentItem, deleteEvent, onSubmit,
  } = props;
  const deleteConfirm = () => {
    if (window.confirm('Are you sure you want to delete this event?')) deleteEvent(currentItem);
  };
  return (
    <Modal isOpen={show} onRequestClose={hideEdit}>
      <Form
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={{ ...currentItem, repeatIn: 21 }}
      >
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ModalHeader onClose={hideEdit}>Edit event</ModalHeader>

            <Field name="id" component="input" type="hidden" />
            <FormFields />
            <RepeatInDays values={values} {...props} />

            <ModalFooter>
              <Button type="button" onClick={deleteConfirm}>
                Delete
              </Button>
              <Button type="submit">
                Save
              </Button>
            </ModalFooter>
          </form>
        )}
      </Form>
    </Modal>
  );
};

EventForm = connect(
  selectEditDialog,
  (dispatch) => {
    const reload = () => dispatch(getEvents());
    return {
      onSubmit: (item) => dispatch(updateEvent(item)).then(reload),
      repeatIn: (item) => dispatch(repeatEvent(item)).then(reload),
      deleteEvent: (item) => dispatch(deleteEvent(item)).then(reload),
      hideEdit: () => dispatch(hideEdit()),
    };
  },
)(EventForm);

export default EventForm;
