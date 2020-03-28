import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NewDocForm from './newDocForm';
import { createDoc, selectCurrent, getNew } from '../../features/docs';
import withOnLoad from '../../components/withOnLoad';


const DocNew = ({ onSubmit, item, saved }) => {
  if (item === null) {
    return saved ? (<Redirect to="/docs" />) : null;
  }

  return (
    <article className="doc-page new">
      <div className="controls">
        <NavLink to="/docs">Back</NavLink>
      </div>
      <NewDocForm onSubmit={onSubmit} />
    </article>
  );
}

let DocNewContainer = withOnLoad(
  DocNew, props => props.onLoad()
);

DocNewContainer = connect(
  selectCurrent,
  dispatch => ({
    onSubmit: data => dispatch(createDoc(data)),
    onLoad: () => dispatch(getNew()),
  })
)(DocNewContainer);

export default DocNewContainer;
