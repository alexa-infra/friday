import * as api from '../api';
import * as Actions from '../constants/auth.actions';
import { history } from '../store';
import { createAction } from './utils';
import * as alerts from './alerts';

export const unauthorized = () => dispatch => history.push('/login')

export const login = (name, password) => dispatch => {
  dispatch(createAction(Actions.LOGIN.REQUEST));
  api.login(name, password)
    .then(result => {
      dispatch(createAction(Actions.LOGIN.SUCCESS, result));
      dispatch(alerts.success('Logged in'));
      history.push('/');
    })
    .catch(error => dispatch(createAction(Actions.LOGIN.FAILURE, { error })));
}
