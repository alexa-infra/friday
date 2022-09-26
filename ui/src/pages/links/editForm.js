import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalFooter } from '../../components/modal';
import Button from '../../components/button';
import {
  getLinks, updateLink, deleteLink, hideEdit, selectEditDialog,
} from '../../features/links';

export const FormFields = () => (
  <>
    <label htmlFor="url">URL</label>
    <Field name="url" component="input" type="text" />

    <label htmlFor="title">Title</label>
    <Field name="title" component="input" type="text" />
  </>
);

let LinkForm = (props) => {
  const {
    show, hideEdit, deleteLink, item: currentItem, onSubmit, loading,
  } = props;
  return (
    <Modal isOpen={show} onRequestClose={hideEdit}>
      <Form
        enableReinitialize
        initialValues={currentItem}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ModalHeader onClose={hideEdit}>Edit</ModalHeader>
            <Field name="id" component="input" type="hidden" />
            <FormFields />
            <ModalFooter>
              <Button type="button" onClick={() => deleteLink(currentItem)} disabled={submitting || loading}>
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

LinkForm = connect(
  selectEditDialog,
  (dispatch) => {
    const reload = () => dispatch(getLinks());
    return {
      onSubmit: (item) => dispatch(updateLink(item)).then(reload),
      deleteLink: (item) => dispatch(deleteLink(item)).then(reload),
      hideEdit: () => dispatch(hideEdit()),
    };
  },
)(LinkForm);

export default LinkForm;
