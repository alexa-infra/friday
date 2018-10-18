import React from 'react';
import { NavLink } from 'react-router-dom';
import { TagsViewer, TagsEdit } from './tags.js';
import { Field, reduxForm } from 'redux-form'
import './docs.css';
import './github-markdown.css';


const renderTags = ({ input }) => (
  <TagsEdit tags={input.value}
            onChange={input.onChange} />
);

let DocForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="id" component="input" type="hidden" />
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <Field name="name" component="input" type="text" />
      </div>
      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <Field name="tags" component={renderTags} />
      </div>
      <div className="form-group">
        <label htmlFor="text">Text</label>
        <Field name="text" component="textarea" wrap="off" />
      </div>
      <button type="submit">
        Save
      </button>
    </form>
  );
}

DocForm = reduxForm({
  form: 'doc',
  enableReinitialize: true,
})(DocForm);

let NewDocForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <Field name="name" component="input" type="text" />
      </div>
      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <Field name="tags" component={renderTags} />
      </div>
      <div className="form-group">
        <label htmlFor="text">Text</label>
        <Field name="text" component="textarea" wrap="off" />
      </div>
      <button type="submit">
        Create
      </button>
    </form>
  );
}

NewDocForm = reduxForm({
  form: 'new-doc',
})(NewDocForm);

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
          <NavLink to={`/docs/${it.id}/edit`}>Edit</NavLink>
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
      <NavLink to={`/docs/${id}/edit`}>Edit</NavLink>
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

const DocEdit = props => {
  const { id, name, tags, text } = props;
  return (
    <article className="doc-page edit">
      <div className="controls">
        <NavLink to={`/docs/${id}/edit`}>Edit Text</NavLink>
        <NavLink to={`/docs/${id}`}>View</NavLink>
        <NavLink to="/docs">Back</NavLink>
      </div>
      <DocForm onSubmit={values => props.update(values)}
               initialValues={{ id, name, tags, text }}/>
    </article>
  )
}

const DocNew = props => (
  <article className="doc-page new">
    <div className="controls">
      <NavLink to="/docs">Back</NavLink>
    </div>
    <NewDocForm onSubmit={values => props.create(values)} />
  </article>
);

export { DocsList, DocNew, DocView, DocEdit };

export default DocsList;
