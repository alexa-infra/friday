import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bookmarks } from '../../actions';


export const FormFields = () => (
  <React.Fragment>
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
  </React.Fragment>
);

let BookmarkForm = props => {
  const { handleSubmit, show, hideEdit, deleteItem, initialValues } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
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
    </Modal>
  );
}

BookmarkForm = reduxForm({
  form: 'bookmark',
  enableReinitialize: true,
})(BookmarkForm);

BookmarkForm = connect(
  state => ({
    initialValues: state.bookmarks.currentItem,
    show: state.bookmarks.currentItem !== null,
  }),
  dispatch => {
    const reloadBookmarks = () => dispatch(bookmarks.getBookmarks());
    return {
      hideEdit: () => dispatch(bookmarks.hideEdit()),
      onSubmit: item => dispatch(bookmarks.updateBookmark(item)).then(reloadBookmarks),
      deleteItem: item => dispatch(bookmarks.deleteBookmark(item)).then(reloadBookmarks),
    };
  }
)(BookmarkForm);

export default BookmarkForm;
