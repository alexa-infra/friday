import React from 'react';
import { Form, Field } from 'react-final-form';
import { renderTags } from './tags';


const DocForm = (props) => {
  const { initialValues, onSubmit, onDelete } = props;
  return (
    <Form
      enableReinitialize
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
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
          <button type="button" onClick={() => onDelete(initialValues)}>
            Delete
          </button>
          <button type="submit">
            Save
          </button>
        </form>
      )}
    </Form>
  );
};

export default DocForm;
