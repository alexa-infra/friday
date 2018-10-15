import React, { Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import './linksPage.css'


const EditModeButton = ({editMode, enterEditMode, exitEditMode}) => (
  <button type="button"
          onClick={e => editMode ? exitEditMode() : enterEditMode() }>
    Edit: {editMode ? 'on' : 'off'}
  </button>
)

const NewLinkButton = ({showNew}) => (
  <button type="button"
          onClick={e => showNew() }>
    New
  </button>
)

const Link = ({ id, url, title }) => (
  <a href={`/api/links/${id}/redirect`} title={url}>{title}</a>
)

const LinkEdit = ({url, title, showEdit}) => (
  <a title={url} onClick={showEdit}>{title}</a>
)

const LinkList = props => (
  <div className="links-page">
    <SearchBox filter={props.filter} doSearch={props.doSearch} />
    <EditModeButton {...props} />
    <NewLinkButton {...props} />
    <ul className="link-list">
      {props.links.map(it => (
        <li key={it.id}>
          { props.editMode ? <LinkEdit {...it} showEdit={() => props.showEdit(it)} />
                           : <Link {...it} /> }
        </li>
      ))}
    </ul>
    <NewLinkForm onSubmit={values => props.create(values)} {...props} />
    <LinkForm onSubmit={values => props.update(values)} {...props} />
  </div>
)

class SearchBox extends Component {
  doSearch = event => {
    const query = this.searchInput.value;
    this.props.doSearch(query);
  }
  render() {
    return (
      <input className="search"
             type="text"
             placeholder="Search..."
             ref={ input => { this.searchInput = input; }}
             value={this.props.filter}
             onChange={this.doSearch} />
    )
  }
}

let LinkForm = props => {
  const { handleSubmit, show, hideEdit, initialValues } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Field name="id" component="input" type="hidden" />
          <div className="form-group">
            <label htmlFor="url">URL</label>
            <Field name="url" component="input" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field name="title" component="input" type="text" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={() => props.delete(initialValues)}>
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
)(LinkForm);

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
          <div className="form-group">
            <label htmlFor="url">URL</label>
            <Field name="url" component="input" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field name="title" component="input" type="text" />
          </div>
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
)(NewLinkForm);

export default LinkList
