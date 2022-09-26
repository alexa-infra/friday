import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { renderTags } from './tags';
import {
  selectCurrent, getDocText, updateDoc, deleteDoc, setWrap,
} from '../../features/docs';
import withOnLoad from '../../components/withOnLoad';
import Button from '../../components/button';

const DocEdit = ({
  onUpdate, onDelete, item, saved, wrap, onSetWrap,
}) => {
  if (item === null) {
    return saved ? (<Redirect to="/docs" />) : null;
  }
  if (saved) {
    return <Redirect to={`/docs/${item.id}`} />;
  }
  const deleteConfirm = () => {
    if (window.confirm('Are you sure you want to delete this item')) onDelete(item);
  };

  return (
    <article className="doc-page edit">
      <Form
        enableReinitialize
        onSubmit={onUpdate}
        initialValues={item}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="controls">
              <Button type="submit">
                Save
              </Button>
              <Button onClick={deleteConfirm}>
                Delete
              </Button>
              <Link to={`/docs/${item.id}`}>
                <Button>View</Button>
              </Link>
              <Link to="/docs">
                <Button>Back</Button>
              </Link>
            </div>
            <Field name="id" component="input" type="hidden" />

            <label htmlFor="name">Name</label>
            <Field name="name" component="input" type="text" />

            <label htmlFor="tags">Tags</label>
            <Field name="tags" component={renderTags} />

            <label htmlFor="wrap">
              <input type="checkbox" checked={wrap} name="wrap" onChange={onSetWrap} />
              <span className="ml-1">Wrap</span>
            </label>

            <Field
              name="text"
              component="textarea"
              wrap={wrap ? 'on' : 'off'}
              className="form-control"
              rows={15}
            />
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
    onSetWrap: () => dispatch(setWrap()),
  }),
)(DocEditContainer);

export default DocEditContainer;
