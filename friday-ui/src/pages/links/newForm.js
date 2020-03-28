import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import { FormFields } from './editForm';
import { getLinks, hideNew, createLink, selectNewDialog } from '../../features/links';


let NewLinkForm = props => {
  const { show, hideEdit, onSubmit, loading } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
      <Form
        onSubmit={onSubmit}>
      {({handleSubmit, pristine, submitting}) => (
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormFields />
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" disabled={pristine || submitting || loading}>
            Create
          </button>
        </Modal.Footer>
      </form>
      )}
      </Form>
    </Modal>
  );
};

NewLinkForm = connect(
  selectNewDialog,
  dispatch => {
    const reload = () => dispatch(getLinks());
    return {
      onSubmit: item => dispatch(createLink(item)).then(reload),
      hideEdit: () => dispatch(hideNew()),
    };
  }
)(NewLinkForm);

export default NewLinkForm;
