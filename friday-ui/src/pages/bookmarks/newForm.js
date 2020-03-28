import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-final-form'
import { connect } from 'react-redux';
import { selectNewDialog, createBookmark, getBookmarks, hideNew } from '../../features/bookmarks';
import { FormFields } from './editForm';


let NewBookmarkForm = props => {
  const { show, hideEdit, onSubmit, item: newItem } = props;
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
  selectNewDialog,
  dispatch => {
    const reloadBookmarks = () => dispatch(getBookmarks());
    return {
      hideEdit: () => dispatch(hideNew()),
      onSubmit: item => dispatch(createBookmark(item)).then(reloadBookmarks),
    };
  }
)(NewBookmarkForm);

export default NewBookmarkForm;
