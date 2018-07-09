import React, { Component } from 'react'
import Modal from './modal'
import { FormText } from './form'
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
    <EditLinkModal {...props} />
    <NewLinkModal {...props} />
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

class EditLinkModal extends Component {
  state = {
    url: '',
    title: '',
    last_access: '',
    usage_count: '',
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

  renderForm(){
    return (
      <div className="edit-link-form">
        <FormText name="URL" value={this.state.url}
                  onChange={this.handleUrlChange} />
        <FormText name="Title" value={this.state.title}
                  onChange={this.handleTitleChange} />
        <FormText name="Last access" value={this.state.last_access}
                  disabled={true} />
        <FormText name="Usage count" value={this.state.usage_count}
                  disabled={true} />
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

class NewLinkModal extends Component {
  state = {
    url: '',
    title: '',
  }

  handleUrlChange = event => {
    this.setState({url: event.target.value})
  }
  handleTitleChange = event => {
    this.setState({title: event.target.value})
  }

  renderForm(){
    return (
      <div className="new-link-form">
        <FormText name="URL" value={this.state.url}
                  onChange={this.handleUrlChange} />
        <FormText name="Title" value={this.state.title}
                  onChange={this.handleTitleChange} />
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
    return <Modal in={this.props.newLink}
                  header={<h1>New</h1>}
                  body={this.renderForm()}
                  footer={this.renderFooter()}
                  onClose={this.props.hideEdit}
                  disabled={this.props.editDisabled} />
  }
}

export default LinkList
