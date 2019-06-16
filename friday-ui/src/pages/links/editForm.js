import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { links } from '../../actions';


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
  </React.Fragment>
);

let LinkForm = props => {
  const { handleSubmit, show, hideEdit, deleteLink, initialValues } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Field name="id" component="input" type="hidden" />
          <FormFields />
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={() => deleteLink(initialValues)}>
            Delete
          </button>
          <button type="submit">
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

LinkForm = reduxForm({
  form: 'link',
  enableReinitialize: true,
})(LinkForm);

LinkForm = connect(
  state => ({
    initialValues: state.links.currentItem,
    show: state.links.currentItem !== null,
  }),
  dispatch => {
    const getLinks = () => dispatch(links.getLinks());
    return {
      onSubmit: item => dispatch(links.updateLink(item)).then(getLinks),
      deleteLink: item => dispatch(links.deleteLink(item)).then(getLinks),
      hideEdit: () => dispatch(links.hideEdit()),
    };
  }
)(LinkForm);

export default LinkForm;
