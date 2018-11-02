import * as api from '../api';
import { callApi, createAction } from './utils';
import { Actions } from '../constants';


export const getLinks = callApi(api.getLinks, 'LINKS');
export const createLink = callApi(api.createLink, 'LINKS_NEW');
export const updateLink = callApi(api.updateLink, 'LINKS_EDIT');
export const deleteLink = callApi(api.deleteLink, 'LINKS_DELETE');

export const toggleEditMode = () => (dispatch, getState) => {
  const { links } = getState();
  const { editMode } = links;
  return dispatch(createAction(Actions.LINKS_EDIT_MODE, !editMode));
}

export const showNew = () => createAction(Actions.LINKS_SHOW_NEW);
export const showEdit = item => createAction(Actions.LINKS_SHOW_EDIT, item);
export const hideEdit = () => createAction(Actions.LINKS_HIDE_EDIT);
export const filterItems = text => createAction(Actions.LINKS_FILTER, text);
