import { Actions } from '../constants';
import * as api from '../api';
import { createAction } from './utils';
import { handleErrors } from './errors';


export const getEvents = () => (dispatch, getState) => {
  const { auth, events } = getState();
  const { firstDay, lastDay } = events;
  dispatch(createAction(Actions.EVENTS_REQUEST));
  api.getEvents(auth, firstDay, lastDay)
    .then(result => dispatch(createAction(Actions.EVENTS_SUCCESS, result)))
    .catch(error => {
      dispatch(createAction(Actions.EVENTS_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}

export const createEvent = data => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(createAction(Actions.EVENTS_NEW_REQUEST));
  api.createEvent(auth, data)
    .then(result => {
      dispatch(createAction(Actions.EVENTS_NEW_SUCCESS, result));
      dispatch(getEvents());
    })
    .catch(error => {
      dispatch(createAction(Actions.EVENTS_NEW_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}

export const updateEvent = data => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(createAction(Actions.EVENTS_EDIT_REQUEST));
  api.updateEvent(auth, data)
    .then(result => {
      dispatch(createAction(Actions.EVENTS_EDIT_SUCCESS, result));
      dispatch(getEvents());
    })
    .catch(error => {
      dispatch(createAction(Actions.EVENTS_EDIT_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}

export const deleteEvent = data => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(createAction(Actions.EVENTS_DELETE_REQUEST));
  api.deleteEvent(auth, data)
    .then(result => {
      dispatch(createAction(Actions.EVENTS_DELETE_SUCCESS, result));
      dispatch(getEvents());
    })
    .catch(error => {
      dispatch(createAction(Actions.EVENTS_DELETE_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}

export const repeatEvent = data => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(createAction(Actions.EVENTS_REPEAT_REQUEST));
  api.repeatEvent(auth, data)
    .then(result => {
      dispatch(createAction(Actions.EVENTS_REPEAT_SUCCESS, result));
      dispatch(getEvents());
    })
    .catch(error => {
      dispatch(createAction(Actions.EVENTS_REPEAT_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}
