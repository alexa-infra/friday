import React from 'react';
import { Form, Field } from 'react-final-form';
import { useLocation, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectLoading, selectAuthorized } from '../../features/auth';
import Button from '../../components/button';

export const LoginForm = () => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const isAuthenticated = useSelector(selectAuthorized);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const onSubmit = (values) => dispatch(login(values));

  if (isAuthenticated) {
    return <Navigate to={from} />;
  }

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, submitting }) => (
        <form className="flex flex-col m-2 p-2 bg-gray-200 border border-black rounded text-center" onSubmit={handleSubmit}>
          <label htmlFor="email">Name</label>
          <Field name="email" component="input" type="text" className="form-control" />

          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password" className="form-control" />

          <div className="buttons">
            <Button type="submit" disabled={submitting || loading}>
              Log in
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
};
