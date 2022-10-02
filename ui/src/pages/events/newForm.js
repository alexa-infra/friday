import React from 'react';
import { Form } from 'react-final-form';
import { FormFields } from './editForm';
import { Modal, ModalHeader, ModalFooter } from '../../components/modal';
import Button from '../../components/button';
import { useCreateEventMutation } from '../../api';

const NewEventForm = ({ item: newItem, show, hide: onClose }) => {
  const [onSubmit, saveState] = useCreateEventMutation();
  const loading = saveState.isFetching;
  React.useEffect(() => {
    if (saveState.isSuccess) {
      saveState.reset();
      onClose();
    }
  }, [saveState, onClose]);
  return (
    <Modal isOpen={show} onRequestClose={onClose}>
      <Form
        enableReinitialize
        initialValues={newItem}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ModalHeader onClose={onClose}>
              Create event
            </ModalHeader>
            <FormFields />
            <ModalFooter>
              <Button type="submit" disabled={loading}>
                Create
              </Button>
            </ModalFooter>
          </form>
        )}
      </Form>
    </Modal>
  );
};

export default NewEventForm;
