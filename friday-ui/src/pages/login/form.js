import React from 'react';
import { Form, Field } from 'react-final-form';
import { useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectLoading, selectAuthorized } from '../../features/auth';


export const LoginForm = () => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const isAuthenticated = useSelector(selectAuthorized);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const onSubmit = (values) => dispatch(login(values));

  if (isAuthenticated) {
    return <Redirect to={from} />;
  }

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, submitting }) => (
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Name</label>
            <Field name="email" component="input" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field name="password" component="input" type="password" className="form-control" />
          </div>
          <div className="buttons">
            <button type="submit" disabled={submitting || loading}>
              Log in
            </button>
          </div>
        </form>
      )}
    </Form>
  );
};
