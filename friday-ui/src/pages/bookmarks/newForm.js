import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bookmarks } from '../../actions';
import { FormFields } from './editForm';


let NewBookmarkForm = props => {
  const { handleSubmit, show, hideEdit } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New bookmark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormFields />
        </Modal.Body>
        <Modal.Footer>
          <button type="submit">
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

NewBookmarkForm = reduxForm({
  form: 'new-bookmark',
  enableReinitialize: true,
})(NewBookmarkForm);

NewBookmarkForm = connect(
  state => ({
    initialValues: state.bookmarks.newItem,
    show: state.bookmarks.newItem !== null,
  }),
  dispatch => {
    const reloadBookmarks = () => dispatch(bookmarks.getBookmarks());
    return {
      hideEdit: () => dispatch(bookmarks.hideEdit()),
      onSubmit: item => dispatch(bookmarks.createBookmark(item)).then(reloadBookmarks),
    };
  }
)(NewBookmarkForm);

export default NewBookmarkForm;
