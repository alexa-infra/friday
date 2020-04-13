import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { renderTags } from './tags';
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
  if (saved) {
    return <Redirect to={`/docs/${item.id}`} />
  }
  const deleteConfirm = (e) => {
    if (window.confirm('Are you sure you want to delete this item'))
      onDelete(item);
  }

  return (
    <article className="doc-page edit">
      <Form
        enableReinitialize
        onSubmit={onUpdate}
        initialValues={item}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="controls">
              <button type="submit">
                Save
              </button>
              <button type="button" onClick={deleteConfirm}>
                Delete
              </button>
              <Link to={`/docs/${item.id}`}>
                <button>View</button>
              </Link>
              <Link to="/docs">
                <button>Back</button>
              </Link>
            </div>
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
              <Field
                name="text"
                component="textarea"
                wrap="off"
                className="form-control"
                rows={15}
              />
            </div>
          </form>
        )}
      </Form>
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
