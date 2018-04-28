import { push } from 'react-router-redux';
import * as api from '../api';
import { Actions } from '../constants';
import { createAction } from './utils';
import * as alerts from './alerts';

export const unauthorized = () => dispatch => {
  dispatch(push('/login'));
}

export const login = (name, password) => dispatch => {
  dispatch(createAction(Actions.AUTH_LOGIN_REQUEST));
  api.login(name, password)
    .then(result => {
      dispatch(createAction(Actions.AUTH_LOGIN_SUCCESS, result));
      dispatch(alerts.success('Logged in'));
      dispatch(push('/'));
    })
    .catch(error => dispatch(createAction(Actions.AUTH_LOGIN_FAILURE, { error })));
}
