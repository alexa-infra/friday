import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { TagsViewer, TagsEdit } from './tags.js';
import './docs.css';
import './github-markdown.css';


const DocsList = ({items, create}) => (
  <div className="doc-page list">
    <div className="controls">
      <NavLink to='/docs/new'>New doc</NavLink>
    </div>
    {items.map(it => (
      <div className="row" key={it.id}>
        <div className="doc">
          <NavLink to={`/docs/${it.id}`}>
            <b>{it.name}</b>
          </NavLink>
          <TagsViewer tags={it.tags} />
        </div>
        <div className="doc-controls">
          <div className="item">
            Created <i title={it.created.toISOString(true)}>{it.created.fromNow()}</i>
          </div>
          <div className="item">
            Updated <i title={it.updated.toISOString(true)}>{it.updated.fromNow()}</i>
          </div>
          <NavLink to={`/docs/${it.id}/edit`}>Edit Text</NavLink>
          <NavLink to={`/docs/${it.id}/info`}>Change Info</NavLink>
        </div>
      </div>
    ))}
  </div>
)

const createMarkup = html => {
  return {__html: html};
}

const DocView = ({id, name, html, tags}) => (
  <div className="doc-page view">
    <div className="controls">
      <NavLink to={`/docs/${id}/edit`}>Edit Text</NavLink>
      <NavLink to={`/docs/${id}/info`}>Change Info</NavLink>
      <NavLink to="/docs">Back</NavLink>
    </div>
    <div className="header">
      <b>{name}</b>
    </div>
    <TagsViewer tags={tags} />
    <div className="markdown-body"
             dangerouslySetInnerHTML={createMarkup(html)}>
    </div>
  </div>
)

class DocInfoEdit extends Component {
  state = {
    id: null,
    name: '',
    text: '',
    tags: [],
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { id, name, text, tags } = nextProps;
    const props = { id, name, text, tags };
    if (prevState !== props) {
      return props;
    }
    return null;
  }
  handleTagChange = tags => {
    this.setState({ tags });
  }
  handleNameChange = event => {
    this.setState({ name: event.target.value });
  }
  render() {
    const { id, name, tags } = this.state;
    return (
      <article className="doc-page edit">
        <div className="controls">
          <NavLink to={`/docs/${id}/edit`}>Edit Text</NavLink>
          <NavLink to={`/docs/${id}`}>View</NavLink>
          <NavLink to="/docs">Back</NavLink>
        </div>
        <input type="text"
               onInput={this.handleNameChange}
               value={name}
               placeholder="Name..."
               />
        <TagsEdit tags={tags}
              onChange={this.handleTagChange}
              placeholder="Tags..."
              disabled={false}/>
        <div className="controls">
          <button onClick={() => this.props.delete(this.state)}>
            Delete
          </button>
          <button onClick={() => this.props.updateInfo(this.state)}>
            Save
          </button>
        </div>
      </article>
    )
  }
}

class DocNew extends Component {
  state = {
    name: '',
    tags: [],
  }
  handleTagChange = tags => {
    this.setState({ tags });
  }
  handleNameChange = event => {
    this.setState({ name: event.target.value });
  }
  render() {
    const { name, tags } = this.state;
    return (
      <article className="doc-page new">
        <div className="controls">
          <NavLink to="/docs">Back</NavLink>
        </div>
        <input type="text"
               onInput={this.handleNameChange}
               value={name}
               placeholder="Name..."
               />
        <TagsEdit tags={tags}
              onChange={this.handleTagChange}
              placeholder="Tags..."
              disabled={false}/>
        <div className="controls">
          <button onClick={() => this.props.create(this.state)}>
            Create
          </button>
        </div>
      </article>
    )
  }
}

class DocEdit extends Component {
  state = {
    id: null,
    name: '',
    text: '',
    tags: [],
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { id, name, text, tags } = nextProps;
    const props = { id, name, text, tags };
    if (prevState !== props) {
      return props;
    }
    return null;
  }
  handleTextChange = event => {
    this.setState({ text: event.target.value });
  }
  getTextNumRows() {
    const { text } = this.state;
    if (!text) return 10;
    const lines = text.split('\n');
    return Math.max(lines.length, 10);
  }
  render() {
    const { id, name, text, tags } = this.state;
    return (
      <div className="doc-page edit">
        <div className="controls">
          <NavLink to={`/docs/${id}`}>View</NavLink>
          <NavLink to={`/docs/${id}/info`}>Change Info</NavLink>
          <NavLink to="/docs">Back</NavLink>
        </div>
        <div className="header">
          {name}
        </div>
        <TagsViewer tags={tags}
              placeholder=""
              disabled={true}/>
        <textarea
          onInput={this.handleTextChange}
          value={text}
          placeholder="Text..."
          rows={this.getTextNumRows()}
          wrap="off"
          />
        <div className="controls">
          <button onClick={() => this.props.updateText(this.state)}>
            Save
          </button>
        </div>
      </div>
    )
  }
}

export { DocsList, DocNew, DocView, DocEdit, DocInfoEdit };

export default DocsList;
