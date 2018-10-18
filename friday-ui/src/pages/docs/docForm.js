import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderTags } from './tags';


let DocForm = props => {
  const { handleSubmit } = props;
  return (
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
        <Field name="text" component="textarea" wrap="off"
               className="form-control" rows={15} />
      </div>
      <button type="submit">
        Save
      </button>
    </form>
  );
}

DocForm = reduxForm({
  form: 'doc',
  enableReinitialize: true,
})(DocForm);

export default DocForm;
