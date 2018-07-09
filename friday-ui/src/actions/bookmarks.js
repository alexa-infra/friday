import { Actions } from '../constants';
import * as api from '../api';
import { createAction, _callApi, callApiAuth } from './utils';


export const getBookmarks = _callApi((getState, data) => {
  const { auth, bookmarks } = getState();
  const { page, per_page, search } = bookmarks;
  return api.getBookmarks(auth, search, page, per_page);
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

export const createBookmark = callApiAuth(api.createBookmark, 'BOOKMARKS_NEW');
export const updateBookmark = callApiAuth(api.updateBookmark, 'BOOKMARKS_EDIT');
export const deleteBookmark = callApiAuth(api.deleteBookmark, 'BOOKMARKS_DELETE');

export const markReadBookmark = _callApi((getState, data) => {
  const { auth } = getState();
  const { readed } = data;
  return api.updateBookmark(auth, {...data, readed: !readed});
}, 'BOOKMARKS_EDIT');
