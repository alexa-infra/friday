import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { renderTags } from './tags';
import { createDoc, selectCurrent, getNew } from '../../features/docs';
import withOnLoad from '../../components/withOnLoad';


const DocNew = ({ onSubmit, item, saved }) => {
  if (item === null) {
    return saved ? (<Redirect to="/docs" />) : null;
  }

  return (
    <article className="doc-page new">
      <Form
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="controls">
              <button type="submit">
                Create
              </button>
              <Link to="/docs">
                <button>Back</button>
              </Link>
            </div>
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

let DocNewContainer = withOnLoad(
  DocNew, (props) => props.onLoad(),
);

DocNewContainer = connect(
  selectCurrent,
  (dispatch) => ({
    onSubmit: (data) => dispatch(createDoc(data)),
    onLoad: () => dispatch(getNew()),
  }),
)(DocNewContainer);

export default DocNewContainer;
