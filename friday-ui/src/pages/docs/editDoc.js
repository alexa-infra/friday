import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import DocForm from './docForm';
import {
  selectCurrent, getDocText, updateDoc, deleteDoc,
} from '../../features/docs';
import withOnLoad from '../../components/withOnLoad';


const DocEdit = ({
  onUpdate, onDelete, item, saved,
}) => {
  if (item === null) {
    return saved ? (<Redirect to="/docs" />) : null;
  }

  return (
    <article className="doc-page edit">
      <div className="controls">
        <NavLink to={`/docs/${item.id}/edit`}>Edit Text</NavLink>
        <NavLink to={`/docs/${item.id}`}>View</NavLink>
        <NavLink to="/docs">Back</NavLink>
      </div>
      <DocForm
        onSubmit={onUpdate}
        initialValues={item}
        onDelete={onDelete}
      />
    </article>
  );
};

let DocEditContainer = withOnLoad(
  DocEdit,
  (props) => {
    const { match } = props;
    props.onLoad(match.params.id);
  },
);

DocEditContainer = connect(
  selectCurrent,
  (dispatch) => ({
    onLoad: (id) => dispatch(getDocText(id)),
    onUpdate: (data) => dispatch(updateDoc(data)),
    onDelete: (data) => dispatch(deleteDoc(data)),
  }),
)(DocEditContainer);

export default DocEditContainer;
