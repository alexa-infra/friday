import { Actions } from '../constants';
import * as api from '../api';
import { createAction } from './utils';
import { handleErrors } from './errors';


export const getBookmarks = () => (dispatch, getState) => {
  const { auth, bookmarks } = getState();
  const { page, per_page, search } = bookmarks;
  dispatch(createAction(Actions.BOOKMARKS_REQUEST));
  api.getBookmarks(auth, search, page, per_page)
    .then(result => dispatch(createAction(Actions.BOOKMARKS_SUCCESS, result)))
    .catch(error => {
      dispatch(createAction(Actions.BOOKMARKS_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}

export const nextPage = () => (dispatch, getState) => {
  const { bookmarks } = getState();
  const { page } = bookmarks;
  dispatch(createAction(Actions.BOOKMARKS_SELECT_PAGE, page + 1));
  dispatch(getBookmarks());
}

export const prevPage = () => (dispatch, getState) => {
  const { bookmarks } = getState();
  const { page } = bookmarks;
  dispatch(createAction(Actions.BOOKMARKS_SELECT_PAGE, page - 1));
  dispatch(getBookmarks());
}

export const perPage = per_page => (dispatch, getState) => {
  const { bookmarks } = getState();
  dispatch(createAction(Actions.BOOKMARKS_SELECT_PER_PAGE, per_page));
  dispatch(getBookmarks());
}
