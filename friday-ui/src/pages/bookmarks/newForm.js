import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-final-form'
import { connect } from 'react-redux';
import { bookmarks } from '../../actions';
import { FormFields } from './editForm';


let NewBookmarkForm = props => {
  const { show, hideEdit, onSubmit, newItem } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
      <Form
        enableReinitialize={true}
        onSubmit={onSubmit}
        initialValues={newItem}>
      {({handleSubmit}) => (
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
      )}
      </Form>
    </Modal>
  );
}

NewBookmarkForm = connect(
  state => ({
    newItem: state.bookmarks.newItem,
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
