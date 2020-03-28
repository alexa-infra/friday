import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { getLinks, updateLink, deleteLink, hideEdit, selectEditDialog } from '../../features/links';


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
  const { show, hideEdit, deleteLink, item: currentItem, onSubmit, loading } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
      <Form
        enableReinitialize={true}
        initialValues={currentItem}
        onSubmit={onSubmit}>
      {({handleSubmit, submitting}) => (
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Field name="id" component="input" type="hidden" />
          <FormFields />
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={() => deleteLink(currentItem)} disabled={submitting || loading}>
            Delete
          </button>
          <button type="submit" disabled={submitting || loading}>
            Save
          </button>
        </Modal.Footer>
      </form>
      )}
      </Form>
    </Modal>
  );
};

LinkForm = connect(
  selectEditDialog,
  dispatch => {
    const reload = () => dispatch(getLinks());
    return {
      onSubmit: item => dispatch(updateLink(item)).then(reload),
      deleteLink: item => dispatch(deleteLink(item)).then(reload),
      hideEdit: () => dispatch(hideEdit()),
    };
  }
)(LinkForm);

export default LinkForm;
