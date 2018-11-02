import * as api from '../api';
import { callApi, createAction } from './utils';
import * as Actions from '../constants/links.actions';


export const getLinks = callApi(api.getLinks, Actions.LIST);
export const createLink = callApi(api.createLink, Actions.NEW);
export const updateLink = callApi(api.updateLink, Actions.EDIT);
export const deleteLink = callApi(api.deleteLink, Actions.DELETE);

export const toggleEditMode = () => (dispatch, getState) => {
  const { links } = getState();
  const { editMode } = links;
  return dispatch(createAction(Actions.EDIT_MODE, !editMode));
}

export const showNew = () => createAction(Actions.SHOW_NEW);
export const showEdit = item => createAction(Actions.SHOW_EDIT, item);
export const hideEdit = () => createAction(Actions.HIDE_EDIT);
export const filterItems = text => createAction(Actions.FILTER, text);
