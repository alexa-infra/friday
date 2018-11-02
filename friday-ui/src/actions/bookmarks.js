import { LIST, NEW, EDIT, DELETE, SELECT_PAGE, SELECT_PER_PAGE, FILTER, SHOW_EDIT, HIDE_EDIT, SHOW_NEW } from '../constants/bookmarks.actions';
import * as api from '../api';
import { createAction, _callApi, callApi } from './utils';


export const getBookmarks = _callApi((getState, data) => {
  const { bookmarks } = getState();
  const { page, per_page, search } = bookmarks;
  return api.getBookmarks(search, page, per_page);
}, LIST);

export const nextPage = () => (dispatch, getState) => {
  const { bookmarks } = getState();
  const { page } = bookmarks;
  return Promise.resolve(dispatch(createAction(SELECT_PAGE, page + 1)));
}

export const prevPage = () => (dispatch, getState) => {
  const { bookmarks } = getState();
  const { page } = bookmarks;
  return Promise.resolve(dispatch(createAction(SELECT_PAGE, page - 1)));
}

export const perPage = per_page => dispatch => {
  return Promise.resolve(dispatch(createAction(SELECT_PER_PAGE, per_page)));
}

export const filterBookmarks = search => dispatch => {
  return Promise.resolve(dispatch(createAction(FILTER, search)));
}

export const createBookmark = callApi(api.createBookmark, NEW);
export const updateBookmark = callApi(api.updateBookmark, EDIT);
export const deleteBookmark = callApi(api.deleteBookmark, DELETE);

export const markReadBookmark = _callApi((getState, data) => {
  const { readed } = data;
  return api.updateBookmark({...data, readed: !readed});
}, EDIT);

export const showEdit = item => createAction(SHOW_EDIT, item);
export const hideEdit = () => createAction(HIDE_EDIT);
export const showNew = item => createAction(SHOW_NEW, item);
