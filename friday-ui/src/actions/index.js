import * as api from '../api';
import { Actions } from '../constants';
import { createAction } from './utils';
import * as alerts from './alerts';
import { handleErrors } from './errors';
import * as auth from './auth';


export const getLinks = (page = 1) => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(createAction(Actions.LINKS_REQUEST));
  api.getLinks(auth, page)
    .then(result => dispatch(createAction(Actions.LINKS_SUCCESS, result.items)))
    .catch(error => {
      dispatch(createAction(Actions.LINKS_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}

export const getEvents = (fromdate, todate) => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(createAction(Actions.EVENTS_REQUEST));
  api.getEvents(auth, fromdate, todate)
    .then(result => dispatch(createAction(Actions.EVENTS_SUCCESS, result)))
    .catch(error => {
      dispatch(createAction(Actions.EVENTS_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}

export { alerts, auth, createAction };
