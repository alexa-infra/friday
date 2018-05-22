import * as api from '../api';
import { Actions } from '../constants';
import { createAction } from './utils';
import { handleErrors } from './errors';


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

export const createLink = data => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(createAction(Actions.LINKS_NEW_REQUEST));
  api.createLink(auth, data)
    .then(result => {
      dispatch(createAction(Actions.LINKS_NEW_SUCCESS, result));
      dispatch(getLinks());
    })
    .catch(error => {
      dispatch(createAction(Actions.LINKS_NEW_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}

export const updateLink = data => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(createAction(Actions.LINKS_EDIT_REQUEST));
  api.updateLink(auth, data)
    .then(result => {
      dispatch(createAction(Actions.LINKS_EDIT_SUCCESS, result));
      dispatch(getLinks());
    })
    .catch(error => {
      dispatch(createAction(Actions.LINKS_EDIT_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}

export const deleteLink = data => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(createAction(Actions.LINKS_DELETE_REQUEST));
  api.deleteLink(auth, data)
    .then(result => {
      dispatch(createAction(Actions.LINKS_DELETE_SUCCESS, result));
      dispatch(getLinks());
    })
    .catch(error => {
      dispatch(createAction(Actions.LINKS_DELETE_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}
