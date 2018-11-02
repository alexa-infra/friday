import * as api from '../api';
import { callApi, createAction } from './utils';
import { LIST, NEW, EDIT, DELETE, EDIT_MODE, SHOW_NEW, SHOW_EDIT, HIDE_EDIT, FILTER } from '../constants/links.actions';


export const getLinks = callApi(api.getLinks, LIST);
export const createLink = callApi(api.createLink, NEW);
export const updateLink = callApi(api.updateLink, EDIT);
export const deleteLink = callApi(api.deleteLink, DELETE);

export const toggleEditMode = () => (dispatch, getState) => {
  const { links } = getState();
  const { editMode } = links;
  return dispatch(createAction(EDIT_MODE, !editMode));
}

export const showNew = () => createAction(SHOW_NEW);
export const showEdit = item => createAction(SHOW_EDIT, item);
export const hideEdit = () => createAction(HIDE_EDIT);
export const filterItems = text => createAction(FILTER, text);
