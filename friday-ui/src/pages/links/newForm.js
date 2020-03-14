import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import { FormFields } from './editForm';
import { links } from '../../actions';


let NewLinkForm = props => {
  const { show, hideEdit, onSubmit } = props;
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
          <button type="submit" disabled={pristine || submitting}>
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
  state => ({
    show: state.links.newLink,
  }),
  dispatch => {
    const getLinks = () => dispatch(links.getLinks());
    return {
      onSubmit: item => dispatch(links.createLink(item)).then(getLinks),
      hideEdit: () => dispatch(links.hideEdit()),
    };
  }
)(NewLinkForm);

export default NewLinkForm;
