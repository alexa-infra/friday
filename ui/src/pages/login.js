import React from 'react';
import { Form, Field } from 'react-final-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCurrentUserQuery, useLoginMutation } from '../api';
import * as alerts from '../slices/alerts';
import { Button } from '../components';

const useCurrentUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const currentUser = useCurrentUserQuery();
  React.useEffect(() => {
    if (currentUser.isSuccess) {
      navigate(from);
    }
  }, [currentUser, navigate, from]);

  return currentUser;
};

const useLogin = () => {
  const [login, loginState] = useLoginMutation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (loginState.isSuccess) {
      dispatch(alerts.success('Logged in'));
    }
    if (loginState.error) {
      dispatch(alerts.error(loginState.error.status));
    }
  }, [loginState, dispatch]);

  return [login, loginState];
};

const FormFields = () => (
  <>
    <label htmlFor="email">Name</label>
    <Field
      name="email"
      component="input"
      type="text"
      className="form-control"
    />

    <label htmlFor="password">Password</label>
    <Field
      name="password"
      component="input"
      type="password"
      className="form-control"
    />
  </>
);

export const LoginPage = () => {
  const currentUser = useCurrentUser();
  const [login, loginState] = useLogin();
  const loading = currentUser.isFetching || loginState.isFetching;
  return (
    <Form onSubmit={login}>
      {({ handleSubmit, submitting }) => (
        <form
          className="flex flex-col m-2 p-2 bg-gray-200 border border-black rounded text-center"
          onSubmit={handleSubmit}
        >
          <FormFields />

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
