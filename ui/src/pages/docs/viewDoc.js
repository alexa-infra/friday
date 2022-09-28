import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrent, getDocHtml } from '../../features/docs';
import { TagsViewer } from './tags';
import Button from '../../components/button';

const createMarkup = (html) => ({ __html: html });

const DocView = ({ item, loadHtml }) => {
  const params = useParams();
  React.useEffect(() => {
    if (item === null) {
      loadHtml(params.id);
    }
  }, [item, params, loadHtml]);

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
        <Link to={`/docs/${id}/edit`}>
          <Button>Edit</Button>
        </Link>
        <Link to="/docs">
          <Button>Back</Button>
        </Link>
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

const DocViewContainer = connect(
  selectCurrent,
  (dispatch) => ({
    loadHtml: (id) => dispatch(getDocHtml(id)),
  }),
)(DocView);

export default DocViewContainer;
