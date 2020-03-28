import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrent, getDocHtml } from '../../features/docs';
import { TagsViewer } from './tags';
import withOnLoad from '../../components/withOnLoad';


const createMarkup = (html) => ({ __html: html });

const DocView = ({ item }) => {
  if (item === null) {
    return null;
  }

  const {
    id, name, html, tags,
  } = item;
  if (html === undefined) return null;

  return (
    <div className="doc-page view">
      <div className="controls">
        <NavLink to={`/docs/${id}/edit`}>Edit</NavLink>
        <NavLink to="/docs">Back</NavLink>
      </div>
      <div className="header">
        <b>{name}</b>
      </div>
      <TagsViewer tags={tags} />
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={createMarkup(html)}
      />
    </div>
  );
};

let DocViewContainer = withOnLoad(
  DocView,
  (props) => {
    const { match } = props;
    props.loadHtml(match.params.id);
  },
);

DocViewContainer = connect(
  selectCurrent,
  (dispatch) => ({
    loadHtml: (id) => dispatch(getDocHtml(id)),
  }),
)(DocViewContainer);

export default DocViewContainer;
