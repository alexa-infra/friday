import { Actions } from '../constants';
import * as api from '../api';
import { createAction, _callApi, callApi } from './utils';


export const getBookmarks = _callApi((getState, data) => {
  const { bookmarks } = getState();
  const { page, per_page, search } = bookmarks;
  return api.getBookmarks(search, page, per_page);
}, 'BOOKMARKS');

export const nextPage = () => (dispatch, getState) => {
  const { bookmarks } = getState();
  const { page } = bookmarks;
  return Promise.resolve(dispatch(createAction(Actions.BOOKMARKS_SELECT_PAGE, page + 1)));
}

export const prevPage = () => (dispatch, getState) => {
  const { bookmarks } = getState();
  const { page } = bookmarks;
  return Promise.resolve(dispatch(createAction(Actions.BOOKMARKS_SELECT_PAGE, page - 1)));
}

export const perPage = per_page => dispatch => {
  return Promise.resolve(dispatch(createAction(Actions.BOOKMARKS_SELECT_PER_PAGE, per_page)));
}

export const filterBookmarks = search => dispatch => {
  return Promise.resolve(dispatch(createAction(Actions.BOOKMARKS_FILTER, search)));
}

export const createBookmark = callApi(api.createBookmark, 'BOOKMARKS_NEW');
export const updateBookmark = callApi(api.updateBookmark, 'BOOKMARKS_EDIT');
export const deleteBookmark = callApi(api.deleteBookmark, 'BOOKMARKS_DELETE');

export const markReadBookmark = _callApi((getState, data) => {
  const { readed } = data;
  return api.updateBookmark({...data, readed: !readed});
}, 'BOOKMARKS_EDIT');
