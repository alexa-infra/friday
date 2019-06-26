import * as api from '../api';
import * as Actions from '../constants/auth.actions';
import { history } from '../store';
import { createAction } from './utils';
import * as alerts from './alerts';

export const unauthorized = () => dispatch => history.push('/login')

export const login = (name, password) => (dispatch, getState) => {
  dispatch(createAction(Actions.LOGIN.REQUEST));
  api.login({email: name, password}, getState)
    .then(result => {
      api.currentUser(null, getState).then(user => {
        dispatch(createAction(Actions.LOGIN.SUCCESS, result));
        dispatch(alerts.success('Logged in'));
        history.push('/');
      }).catch(error => {
        if (error.status === 401) {
          dispatch(createAction(Actions.USE_HEADERS));
          dispatch(createAction(Actions.LOGIN.SUCCESS, result));
          dispatch(alerts.success('Logged in'));
          history.push('/');
        } else {
          dispatch(createAction(Actions.LOGIN.FAILURE, { error }));
          dispatch(alerts.success('Unknown login error'));
        }
      });
    })
    .catch(error => dispatch(createAction(Actions.LOGIN.FAILURE, { error })));
}
