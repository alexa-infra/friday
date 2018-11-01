import React from 'react';
import { Field, reduxForm } from 'redux-form'
import './form.css';


let LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="lead">
        Login to your account
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <Field name="name" component="input" type="text" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="password" />
      </div>
      <div className="buttons">
        <button type="submit">
          Log in
        </button>
      </div>
    </form>
  );
}

LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

export default LoginForm;
