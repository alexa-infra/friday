import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import NewDocForm from './newDocForm';
import { docs } from '../../actions';
import { history } from '../../store';


const DocNew = props => (
  <article className="doc-page new">
    <div className="controls">
      <NavLink to="/docs">Back</NavLink>
    </div>
    <NewDocForm onSubmit={values => props.create(values)} />
  </article>
);

const DocNewContainer = connect(
  null,
  dispatch => ({
    create: data => dispatch(docs.createDoc(data)).then(
        ({ id }) => dispatch(docs.updateDocText({...data, id }))
      ).then(() => history.push('/docs')),
  })
)(DocNew);

export default DocNewContainer;
