import React from 'react';
import { Form } from 'react-final-form';
import { Modal, ModalHeader, ModalFooter } from '../../components/modal';
import Button from '../../components/button';
import { FormFields } from './editForm';
import { useCreateBookmarkMutation } from '../../api';

const NewBookmarkForm = ({ show, hideEdit, item: newItem }) => {
  const [onSubmit, createState] = useCreateBookmarkMutation();
  React.useEffect(() => {
    if (createState.isSuccess) {
      hideEdit();
      createState.reset();
    }
  }, [createState, hideEdit]);
  const loading = createState.isLoading;
  return (
    <Modal
      isOpen={show}
      onRequestClose={hideEdit}
    >
      <Form
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={newItem}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ModalHeader onClose={hideEdit}>
              New bookmark
            </ModalHeader>
            <FormFields />
            <ModalFooter>
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

export default NewBookmarkForm;
