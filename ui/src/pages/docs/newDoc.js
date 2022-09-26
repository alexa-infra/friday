import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { renderTags } from './tags';
import { createDoc, selectCurrent, getNew, setWrap } from '../../features/docs';
import withOnLoad from '../../components/withOnLoad';
import Button from '../../components/button';

const DocNew = ({ onSubmit, item, saved, wrap, onSetWrap }) => {
  if (item === null) {
    return null;
  }
  if (saved) {
    return <Redirect to={`/docs/${item.id}`} />;
  }

  return (
    <article className="doc-page new">
      <Form
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="controls">
              <Button type="submit">
                Create
              </Button>
              <Link to="/docs">
                <Button>Back</Button>
              </Link>
            </div>

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

let DocNewContainer = withOnLoad(
  DocNew, (props) => props.onLoad(),
);

DocNewContainer = connect(
  selectCurrent,
  (dispatch) => ({
    onSubmit: (data) => dispatch(createDoc(data)),
    onLoad: () => dispatch(getNew()),
    onSetWrap: () => dispatch(setWrap()),
  }),
)(DocNewContainer);

export default DocNewContainer;
