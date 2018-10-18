import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import DocForm from './docForm';
import { history } from '../../store';
import { docs } from '../../actions';
import withOnLoad from '../../components/withOnLoad';


const DocEdit = props => {
  const { doc } = props;
  const { id } = doc || {};
  return (
    <article className="doc-page edit">
      <div className="controls">
        <NavLink to={`/docs/${id}/edit`}>Edit Text</NavLink>
        <NavLink to={`/docs/${id}`}>View</NavLink>
        <NavLink to="/docs">Back</NavLink>
      </div>
      <DocForm onSubmit={values => props.update(values)}
               initialValues={doc}
               onDelete={values => props.delete(values)}/>
    </article>
  )
}

let DocEditContainer = withOnLoad(
  DocEdit,
  props => {
    const { match } = props;
    const data = { id: match.params.id };
    props.load(data);
  }
);
DocEditContainer = connect(
  state => ({
    doc: state.docs.currentItem,
  }),
  dispatch => ({
    load: data => dispatch(docs.getDoc(data)).then(
      () => dispatch(docs.getDocText(data))
    ),
    update: data => dispatch(docs.updateDoc(data)).then(
      () => dispatch(docs.updateDocText(data))
    ).then(
      () => history.push(`/docs/${data.id}`)
    ),
    delete: data => dispatch(docs.deleteDoc(data)).then(
      () => history.push('/docs')
    ),
  })
)(DocEditContainer);

export default DocEditContainer;
