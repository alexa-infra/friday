import React from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import { FormFields } from './editForm';
import { Modal, ModalHeader, ModalFooter } from '../../components/modal';
import Button from '../../components/button';
import {
  getLinks, hideNew, createLink, selectNewDialog,
} from '../../features/links';

let NewLinkForm = (props) => {
  const {
    show, hideEdit, onSubmit, loading,
  } = props;
  return (
    <Modal isOpen={show} onRequestClose={hideEdit}>
      <Form
        onSubmit={onSubmit}
      >
        {({ handleSubmit, pristine, submitting }) => (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ModalHeader onClose={hideEdit}>
              New link
            </ModalHeader>
            <FormFields />
            <ModalFooter>
              <Button type="submit" disabled={pristine || submitting || loading}>
                Create
              </Button>
            </ModalFooter>
          </form>
        )}
      </Form>
    </Modal>
  );
};

NewLinkForm = connect(
  selectNewDialog,
  (dispatch) => {
    const reload = () => dispatch(getLinks());
    return {
      onSubmit: (item) => dispatch(createLink(item)).then(reload),
      hideEdit: () => dispatch(hideNew()),
    };
  },
)(NewLinkForm);

export default NewLinkForm;
