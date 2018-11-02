import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { FormFields } from './editForm';
import { links } from '../../actions';


let NewLinkForm = props => {
  const { handleSubmit, pristine, submitting, show, hideEdit } = props;
  const disabled = pristine || submitting;
  return (
    <Modal show={show} onHide={hideEdit}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormFields />
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" disabled={disabled}>
            Create
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

NewLinkForm = reduxForm({
  form: 'new-link',
})(NewLinkForm);

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
