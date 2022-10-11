import React from 'react';
import { Form, Field } from 'react-final-form';
import { Modal, ModalHeader, ModalFooter } from '../../components';
import { Button } from '../../components';
import { useUpdateBookmarkMutation, useDeleteBookmarkMutation } from '../../api';

export const FormFields = () => (
  <>
      <label htmlFor="url" className="flex-1">URL</label>
      <Field name="url" component="input" type="text" className="flex-grow" />

      <label htmlFor="title" className="flex-1">Title</label>
      <Field name="title" component="input" type="text" className="flex-grow" />

      <label htmlFor="readed" className="inline-flex items-center">
        <Field name="readed" component="input" type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
        <span className="ml-2">Read</span>
      </label>

      <label htmlFor="favorite" className="inline-flex items-center">
        <Field name="favorite" component="input" type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" />
        <span className="ml-2">Favorite</span>
      </label>
  </>
);

export const BookmarkEditForm = ({ show, hideEdit, item: currentItem }) => {
  const [onSubmit, updateState] = useUpdateBookmarkMutation();
  const [deleteItem, deleteState] = useDeleteBookmarkMutation();
  React.useEffect(() => {
    if (updateState.isSuccess) {
      hideEdit();
      updateState.reset();
    }
  }, [updateState, hideEdit]);
  React.useEffect(() => {
    if (deleteState.isSuccess) {
      hideEdit();
      deleteState.reset();
    }
  }, [deleteState, hideEdit]);
  const loading = updateState.isLoading || deleteState.isLoading;
  return (
    <Modal isOpen={show} onRequestClose={hideEdit}>
      <Form
        enableReinitialize
        initialValues={currentItem}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, initialValues, submitting }) => (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ModalHeader onClose={hideEdit}>
              Edit bookmark
            </ModalHeader>

            <Field name="id" component="input" type="hidden" />
            <FormFields />

            <ModalFooter>
              <Button type="button" onClick={() => deleteItem(initialValues)} disabled={submitting || loading}>
                Delete
              </Button>
              <Button type="submit" disabled={submitting || loading}>
                Save
              </Button>
            </ModalFooter>
          </form>
        )}
      </Form>
    </Modal>
  );
};
