import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { docs } from '../../actions';
import { TagsViewer } from './tags';
import withOnLoad from '../../components/withOnLoad';


const createMarkup = html => ({__html: html});

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
);

let DocViewContainer = withOnLoad(
  DocView,
  props => {
    const { match } = props;
    const data = { id: match.params.id };
    props.loadHtml(data);
  }
);
DocViewContainer = connect(
  state => state.docs.currentItem,
  dispatch => ({
    loadHtml: data => dispatch(docs.getDoc(data)).then(
      () => dispatch(docs.getDocHtml(data))
    ),
  })
)(DocViewContainer);

export default DocViewContainer;
