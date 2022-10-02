import React from 'react';
import { Form, Field } from 'react-final-form';
import { Modal, ModalHeader, ModalFooter } from '../../components/modal';
import Button from '../../components/button';
import { useUpdateEventMutation, useDeleteEventMutation, useRepeatEventMutation } from '../../api';

const RepeatInDays = ({ repeatEvent, disabled }) => {
  return (
    <>
      <label htmlFor="repeatIn">Repeat In</label>
      <div className="field">
        <Field name="repeatIn" component="input" type="number" />
        <Button type="button" onClick={repeatEvent} disabled={disabled}>
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

const EventForm = ({ item: currentItem, show, hide: onClose }) => {
  const [onSubmit, saveState] = useUpdateEventMutation();
  const [deleteEvent, deleteState] = useDeleteEventMutation();
  const [repeatEvent, repeatState] = useRepeatEventMutation();
  const deleteConfirm = () => {
    if (window.confirm('Are you sure you want to delete this event?')) deleteEvent(currentItem);
  };
  const loading = deleteState.isFetching || saveState.isFetching || repeatEvent.isFetching;
  React.useEffect(() => {
    if (deleteState.isSuccess) {
      deleteState.reset();
      onClose();
    }
  }, [deleteState, onClose]);
  React.useEffect(() => {
    if (saveState.isSuccess) {
      saveState.reset();
      onClose();
    }
  }, [saveState, onClose]);
  React.useEffect(() => {
    if (repeatState.isSuccess) {
      repeatState.reset();
    }
  }, [repeatState]);
  return (
    <Modal isOpen={show} onRequestClose={onClose}>
      <Form
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={{ ...currentItem, repeatIn: 21 }}
      >
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ModalHeader onClose={onClose}>Edit event</ModalHeader>

            <Field name="id" component="input" type="hidden" />
            <FormFields />
            <RepeatInDays repeatEvent={() => repeatEvent(values)} disabled={loading} />

            <ModalFooter>
              <Button type="button" onClick={deleteConfirm} disabled={loading}>
                Delete
              </Button>
              <Button type="submit" disabled={loading}>
                Save
              </Button>
            </ModalFooter>
          </form>
        )}
      </Form>
    </Modal>
  );
};

export default EventForm;
