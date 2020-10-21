import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import {
  getEvents, hideEdit, updateEvent, repeatEvent, deleteEvent, selectEditDialog,
} from '../../features/events';


const RepeatInDays = (props) => {
  const { values, repeatIn } = props;
  return (
    <div className="form-group">
      <label htmlFor="repeatIn">Repeat In</label>
      <div className="field">
        <Field name="repeatIn" component="input" type="number" />
        <button type="button" onClick={() => repeatIn(values)}>
          Repeat
        </button>
      </div>
    </div>
  );
};

export const FormFields = (props) => (
  <>
    <div className="form-group">
      <label htmlFor="date">Date</label>
      <Field name="date" component="input" type="text" disabled />
    </div>
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <Field name="name" component="input" type="text" />
    </div>
    <div className="form-group">
      <label htmlFor="icon">Icon</label>
      <Field name="icon" component="input" type="text" />
    </div>
    <div className="form-group">
      <label htmlFor="repeat">Repeat</label>
      <Field name="repeat" component="select">
        <option value="none">No repeat</option>
        <option value="daily">Day</option>
        <option value="weekly">Week</option>
        <option value="biweekly">2 Weeks</option>
        <option value="monthly">Month</option>
        <option value="annually">Year</option>
      </Field>
    </div>
  </>
);

let EventForm = (props) => {
  const {
    show, hideEdit, item: currentItem, deleteEvent, onSubmit,
  } = props;
  const deleteConfirm = () => {
    if (window.confirm('Are you sure you want to delete this event?'))
      deleteEvent(currentItem);
  }
  return (
    <Modal show={show} onHide={hideEdit}>
      <Form
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={{ ...currentItem, repeatIn: 21 }}
      >
        {({ handleSubmit, initialValues, values }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Field name="id" component="input" type="hidden" />
              <FormFields />
              <RepeatInDays values={values} {...props} />
            </Modal.Body>
            <Modal.Footer>
              <button type="button" onClick={deleteConfirm}>
                Delete
              </button>
              <button type="submit">
                Save
              </button>
            </Modal.Footer>
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
