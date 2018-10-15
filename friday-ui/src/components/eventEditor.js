import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import * as moment from 'moment';


const RepeatInDays = props => {
  const { formValues, repeatIn } = props;
  return (
    <div className="form-group">
      <label htmlFor="repeatIn">Repeat In</label>
      <div className="field">
        <Field name="repeatIn" component="input" type="number" />
        <button type="button" onClick={() => repeatIn(formValues)}>
          Repeat
        </button>
      </div>
    </div>
  );
}

const FormFields = props => (
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
  const { handleSubmit, show, hideEdit, initialValues } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
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
          <button type="button" onClick={() => props.delete(initialValues)}>
            Delete
          </button>
          <button type="submit">
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

EventForm = reduxForm({
  form: 'event',
  enableReinitialize: true,
})(EventForm);

EventForm = connect(
  state => ({
    initialValues: { ...state.events.currentItem, repeatIn: 24 },
    show: state.events.currentItem !== null,
    formValues: getFormValues('event')(state),
  }),
)(EventForm);

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
)(NewEventForm);

export { NewEventForm as NewEventModal, EventForm as EditEventModal }
