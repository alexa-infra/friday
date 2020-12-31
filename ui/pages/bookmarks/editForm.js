import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import {
  selectEditDialog, updateBookmark, getBookmarks, hideEdit, deleteBookmark,
} from '../../features/bookmarks';
import { Modal, ModalHeader, ModalFooter } from '../../components/modal';
import Button from '../../components/button';

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
  </>
);

let BookmarkForm = (props) => {
  const {
    show, hideEdit, item: currentItem, deleteItem, onSubmit,
  } = props;
  return (
    <Modal isOpen={show} onRequestClose={hideEdit}>
      <Form
        enableReinitialize
        initialValues={currentItem}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, initialValues }) => (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ModalHeader onClose={hideEdit}>
              Edit bookmark
            </ModalHeader>

            <Field name="id" component="input" type="hidden" />
            <FormFields />

            <ModalFooter>
              <Button type="button" onClick={() => deleteItem(initialValues)}>
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

BookmarkForm = connect(
  selectEditDialog,
  (dispatch) => {
    const reloadBookmarks = () => dispatch(getBookmarks());
    return {
      hideEdit: () => dispatch(hideEdit()),
      onSubmit: (item) => dispatch(updateBookmark(item)).then(reloadBookmarks),
      deleteItem: (item) => dispatch(deleteBookmark(item)).then(reloadBookmarks),
    };
  },
)(BookmarkForm);

export default BookmarkForm;
