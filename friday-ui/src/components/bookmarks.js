import React, { Component } from 'react'
import classNames from 'classnames'
import Modal from 'react-bootstrap/lib/Modal'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import './bookmarks.css'


const Bookmark = ({title, url, domain, created, readed, onEdit, onMarkRead, onDelete}) => (
  <div className="bookmark">
    <div className="title">
      <a className={classNames({done: readed})} href={url}>{title}</a>
      <div className="site">
        (<a href={url}>{domain}</a>)
      </div>
    </div>
    <div className="controls">
      <i title={created.toISOString(true)}>{created.fromNow()}</i>
      <a onClick={onEdit}>edit</a>
      <a onClick={onMarkRead}>mark as read</a>
      <a onClick={onDelete}>remove</a>
    </div>
  </div>
)

const BookmarksPage = props => (
  <div className="bookmarks-page">
    <SearchBox {...props} />
    <div className="bookmarks">
      {props.items.map(it => (
        <Bookmark key={it.id}
                  {...it}
                  onEdit={() => props.showEdit(it)}
                  onMarkRead={() => props.markRead(it)}
                  onDelete={() => props.delete(it)} />
      ))}
    </div>
    <Pagination {...props} />
    <BrowserBookmark />
    <BookmarkForm onSubmit={values => props.update(values)} {...props} />
    <NewBookmarkForm onSubmit={values => props.create(values)} {...props} />
  </div>
)

const Pagination = ({page, pages, hasPrev, hasNext, prevPage, nextPage, per_page, changePerPage}) => (
  <div className="pagination">
    <div className="buttons">
      <button type="button" onClick={prevPage}
              disabled={!hasPrev}>
        <i className="fa fa-chevron-left" />
      </button>
      <button type="button" disabled={true}>
        {page} / {pages}
      </button>
      <button type="button" onClick={nextPage}
              disabled={!hasNext}>
        <i className="fa fa-chevron-right" />
      </button>
    </div>
    <div>
      Per page {' '}
      <select value={per_page}
              onChange={e => changePerPage(e.target.value)}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  </div>
)

class SearchBox extends Component {
  state = {
    search: null,
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.search !== prevState.search)
      return {
        search: nextProps.search,
      }
    return null;
  }
  handleChangeSearch = event => {
    this.setState({search: event.target.value})
  }
  render() {
    return (
      <div className="search-box">
        <input className="search"
               type="text"
               placeholder="Search..."
               value={this.state.search || ''}
               onChange={this.handleChangeSearch} />
        <button type="button"
                onClick={() => this.props.doSearch(this.state.search)}>
          Search
        </button>
        <button type="button"
                onClick={() => this.props.resetSearch()}>
          Reset
        </button>
        <button type="button"
                onClick={() => this.props.showEditNew()}>
          New
        </button>
      </div>
    )
  }
}

let BookmarkForm = props => {
  const { handleSubmit, show, hideEdit, initialValues } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit bookmark</Modal.Title>
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
          <div className="form-check">
            <Field name="readed" component="input" type="checkbox" />
            <label htmlFor="readed">Read</label>
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
}

BookmarkForm = reduxForm({
  form: 'bookmark',
  enableReinitialize: true,
})(BookmarkForm);

BookmarkForm = connect(
  state => ({
    initialValues: state.bookmarks.currentItem,
    show: state.bookmarks.currentItem !== null,
  }),
)(BookmarkForm);

let NewBookmarkForm = props => {
  const { handleSubmit, show, hideEdit } = props;
  return (
    <Modal show={show} onHide={hideEdit}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New bookmark</Modal.Title>
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
          <div className="form-check">
            <Field name="readed" component="input" type="checkbox" />
            <label htmlFor="readed">Read</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit">
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

NewBookmarkForm = reduxForm({
  form: 'new-bookmark',
})(NewBookmarkForm);

NewBookmarkForm = connect(
  state => ({
    show: state.bookmarks.newItem !== null,
  }),
)(NewBookmarkForm);

class BrowserBookmark extends Component {
  getBookmarkScript() {
    return `javascript:(function(){
      var redirect = '${document.location.origin}/bookmarks/add?';
      var searchString = new URLSearchParams();
      searchString.append('title', document.title);
      searchString.append('url', document.location.href);
      redirect += searchString.toString();
      window.open(redirect, '_blank');
    })()`
  }
  render() {
    return <a href={this.getBookmarkScript()}>Bookmark</a>
  }
}

export default BookmarksPage
