import React from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import {
  selectNewDialog, createBookmark, getBookmarks, hideNew,
} from '../../features/bookmarks';
import { Modal, ModalHeader, ModalFooter } from '../../components/modal';
import Button from '../../components/button';
import { FormFields } from './editForm';

let NewBookmarkForm = (props) => {
  const {
    show, hideEdit, onSubmit, item: newItem,
  } = props;
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

NewBookmarkForm = connect(
  selectNewDialog,
  (dispatch) => {
    const reloadBookmarks = () => dispatch(getBookmarks());
    return {
      hideEdit: () => dispatch(hideNew()),
      onSubmit: (item) => dispatch(createBookmark(item)).then(reloadBookmarks),
    };
  },
)(NewBookmarkForm);

export default NewBookmarkForm;
