import React from 'react';
import { Form, Field } from 'react-final-form';
import { renderTags } from './tags';


const NewDocForm = (props) => {
  const { onSubmit } = props;
  return (
    <Form
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
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
          <button type="submit">
            Create
          </button>
        </form>
      )}
    </Form>
  );
};

export default NewDocForm;
