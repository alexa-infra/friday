import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux'
import * as moment from 'moment';
import { events } from '../../actions';


const RepeatInDays = props => {
  const { currentItem, repeatIn } = props;
  return (
    <div className="form-group">
      <label htmlFor="repeatIn">Repeat In</label>
      <div className="field">
        <Field name="repeatIn" component="input" type="number" />
        <button type="button" onClick={() => repeatIn(currentItem)}>
          Repeat
        </button>
      </div>
    </div>
  );
}

export const FormFields = props => (
  <React.Fragment>
    <div className="form-group">
      <label htmlFor="date">Date</label>
      <Field name="date" component="input" type="text" disabled
             format={v => v != null ? v.format('YYYY-MM-DD') : null}
             parse={v => v != null ? moment(v, 'YYYY-MM-DD') : null} />
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
  </React.Fragment>
);

let EventForm = props => {
  const { show, hideEdit, currentItem, deleteEvent, onSubmit } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
      <Form
        enableReinitialize={true}
        onSubmit={onSubmit}
        initialValues={currentItem}>
      {({handleSubmit, initialValues}) => (
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Field name="id" component="input" type="hidden" />
          <FormFields />
          <RepeatInDays {...props} />
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={() => deleteEvent(initialValues)}>
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
  state => ({
    currentItem: { ...state.events.currentItem, repeatIn: 24 },
    show: state.events.currentItem !== null,
  }),
  dispatch => {
    const getEvents = () => dispatch(events.getEvents());
    return {
      onSubmit: item => dispatch(events.updateEvent(item)).then(getEvents),
      repeatIn: item => dispatch(events.repeatEvent(item)).then(getEvents),
      deleteEvent: item => dispatch(events.deleteEvent(item)).then(getEvents),
      hideEdit: () => dispatch(events.hideEdit()),
    };
  }
)(EventForm);

export default EventForm;
