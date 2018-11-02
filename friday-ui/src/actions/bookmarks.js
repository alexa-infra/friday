import * as Actions from '../constants/bookmarks.actions';
import * as api from '../api';
import { createAction, _callApi, callApi } from './utils';


export const getBookmarks = _callApi((getState, data) => {
  const { bookmarks } = getState();
  const { page, per_page, search } = bookmarks;
  return api.getBookmarks(search, page, per_page);
}, Actions.LIST);

export const nextPage = () => (dispatch, getState) => {
  const { bookmarks } = getState();
  const { page } = bookmarks;
  return Promise.resolve(dispatch(createAction(Actions.SELECT_PAGE, page + 1)));
}

export const prevPage = () => (dispatch, getState) => {
  const { bookmarks } = getState();
  const { page } = bookmarks;
  return Promise.resolve(dispatch(createAction(Actions.SELECT_PAGE, page - 1)));
}

export const perPage = per_page => dispatch => {
  return Promise.resolve(dispatch(createAction(Actions.SELECT_PER_PAGE, per_page)));
}

export const filterBookmarks = search => dispatch => {
  return Promise.resolve(dispatch(createAction(Actions.FILTER, search)));
}

export const createBookmark = callApi(api.createBookmark, Actions.NEW);
export const updateBookmark = callApi(api.updateBookmark, Actions.EDIT);
export const deleteBookmark = callApi(api.deleteBookmark, Actions.DELETE);

export const markReadBookmark = _callApi((getState, data) => {
  const { readed } = data;
  return api.updateBookmark({...data, readed: !readed});
}, Actions.EDIT);

export const showEdit = item => createAction(Actions.SHOW_EDIT, item);
export const hideEdit = () => createAction(Actions.HIDE_EDIT);
export const showNew = item => createAction(Actions.SHOW_NEW, item);
