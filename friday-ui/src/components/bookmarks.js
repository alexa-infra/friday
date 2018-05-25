import React, { Component } from 'react'
import classNames from 'classnames'
import Modal from './modal'
import { FormText, FormCheckbox } from './form'
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
    <EditBookmarkModal {...props} />
    <NewBookmarkModal {...props} />
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

class EditBookmarkModal extends Component {
  state = {
    url: '',
    title: '',
    readed: false,
    currentItem: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.currentItem !== nextProps.currentItem)
      return {
        ...nextProps.currentItem,
        currentItem: nextProps.currentItem,
      }
    return null;
  }

  handleUrlChange = event => {
    this.setState({url: event.target.value})
  }
  handleTitleChange = event => {
    this.setState({title: event.target.value})
  }
  handleReadedChange = event => {
    this.setState({readed: event.target.checked})
  }

  renderForm(){
    return (
      <div className="edit-bookmark-form">
        <FormText name="URL" value={this.state.url}
                  onChange={this.handleUrlChange} />
        <FormText name="Title" value={this.state.title}
                  onChange={this.handleTitleChange} />
        <FormCheckbox name="Read" value={this.state.readed}
                      onChange={this.handleReadedChange} />
      </div>
    )
  }
  renderFooter(){
    return (
      <div className="buttons">
        <button type="button"
                disabled={this.props.editDisabled}
                onClick={() => this.props.update(this.state)}>
          Update
        </button>
        <button type="button"
                disabled={this.props.editDisabled}
                onClick={() => this.props.delete(this.state)}>
          Delete
        </button>
      </div>
    )
  }
  render() {
    return <Modal in={this.props.currentItem !== null}
                  header={<h1>Edit</h1>}
                  body={this.renderForm()}
                  footer={this.renderFooter()}
                  onClose={this.props.hideEdit}
                  disabled={false} />
  }
}

class NewBookmarkModal extends Component {
  state = {
    url: '',
    title: '',
    readed: false,
  }

  handleUrlChange = event => {
    this.setState({url: event.target.value})
  }
  handleTitleChange = event => {
    this.setState({title: event.target.value})
  }
  handleReadedChange = event => {
    this.setState({readed: event.target.checked})
  }

  renderForm(){
    return (
      <div className="new-bookmark-form">
        <FormText name="URL" value={this.state.url}
                  onChange={this.handleUrlChange} />
        <FormText name="Title" value={this.state.title}
                  onChange={this.handleTitleChange} />
        <FormCheckbox name="Read" value={this.state.readed}
                      onChange={this.handleReadedChange} />
      </div>
    )
  }
  renderFooter(){
    return (
      <button type="button"
              disabled={this.props.editDisabled}
              onClick={() => this.props.create(this.state)}>
        Create
      </button>
    )
  }
  render() {
    return <Modal in={this.props.newItem}
                  header={<h1>New</h1>}
                  body={this.renderForm()}
                  footer={this.renderFooter()}
                  onClose={this.props.hideEdit}
                  disabled={this.props.editDisabled} />
  }
}

export default BookmarksPage
