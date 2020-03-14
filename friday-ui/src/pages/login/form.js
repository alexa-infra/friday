import React from 'react';
import { Form, Field } from 'react-final-form'
import './form.scss';


let LoginForm = () => {
  return (
    <Form>
    {({ handleSubmit }) => (
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Field name="name" component="input" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password" className="form-control" />
        </div>
        <div className="buttons">
          <button type="submit">
            Log in
          </button>
        </div>
      </form>
    )}
    </Form>
  );
}

export default LoginForm;
