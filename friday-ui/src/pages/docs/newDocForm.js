import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderTags } from './tags';


let NewDocForm = props => {
  const { handleSubmit } = props;
  return (
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
        <Field name="text" component="textarea" wrap="off" />
      </div>
      <button type="submit">
        Create
      </button>
    </form>
  );
}

NewDocForm = reduxForm({
  form: 'new-doc',
})(NewDocForm);

export default NewDocForm;
