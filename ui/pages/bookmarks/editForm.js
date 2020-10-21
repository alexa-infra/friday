import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import {
  selectEditDialog, updateBookmark, getBookmarks, hideEdit, deleteBookmark,
} from '../../features/bookmarks';

export const FormFields = () => (
  <>
    <div className="form-group">
      <label htmlFor="url">URL</label>
      <Field name="url" component="input" type="text" />
    </div>
    <div className="form-group">
      <label htmlFor="title">Title</label>
      <Field name="title" component="input" type="text" />
    </div>
    <div className="form-check">
      <Field name="readed" component="input" type="checkbox" />
      <label htmlFor="readed">Read</label>
    </div>
  </>
);

let BookmarkForm = (props) => {
  const {
    show, hideEdit, item: currentItem, deleteItem, onSubmit,
  } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
      <Form
        enableReinitialize
        initialValues={currentItem}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, initialValues }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit bookmark</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Field name="id" component="input" type="hidden" />
              <FormFields />
            </Modal.Body>
            <Modal.Footer>
              <button type="button" onClick={() => deleteItem(initialValues)}>
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
