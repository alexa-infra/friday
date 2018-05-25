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

export const perPage = per_page => dispatch => {
  dispatch(createAction(Actions.BOOKMARKS_SELECT_PER_PAGE, per_page));
  dispatch(getBookmarks());
}

export const filterBookmarks = search => dispatch => {
  dispatch(createAction(Actions.BOOKMARKS_FILTER, search));
  dispatch(getBookmarks());
}

export const createBookmark = data => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(createAction(Actions.BOOKMARKS_NEW_REQUEST));
  api.createBookmark(auth, data)
    .then(result => {
      dispatch(createAction(Actions.BOOKMARKS_NEW_SUCCESS, result));
      dispatch(getBookmarks());
    })
    .catch(error => {
      dispatch(createAction(Actions.BOOKMARKS_NEW_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}

export const updateBookmark = data => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(createAction(Actions.BOOKMARKS_EDIT_REQUEST));
  api.updateBookmark(auth, data)
    .then(result => {
      dispatch(createAction(Actions.BOOKMARKS_EDIT_SUCCESS, result));
      dispatch(getBookmarks());
    })
    .catch(error => {
      dispatch(createAction(Actions.BOOKMARKS_EDIT_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}

export const deleteBookmark = data => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(createAction(Actions.BOOKMARKS_DELETE_REQUEST));
  api.deleteBookmark(auth, data)
    .then(result => {
      dispatch(createAction(Actions.BOOKMARKS_DELETE_SUCCESS, result));
      dispatch(getBookmarks());
    })
    .catch(error => {
      dispatch(createAction(Actions.BOOKMARKS_DELETE_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}

export const markReadBookmark = data => (dispatch, getState) => {
  const { auth } = getState();
  const { readed } = data;
  dispatch(createAction(Actions.BOOKMARKS_EDIT_REQUEST));
  api.updateBookmark(auth, {...data, readed: !readed})
    .then(result => {
      dispatch(createAction(Actions.BOOKMARKS_EDIT_SUCCESS, result));
      dispatch(getBookmarks());
    })
    .catch(error => {
      dispatch(createAction(Actions.BOOKMARKS_EDIT_FAILURE, { error }));
      dispatch(handleErrors(error.status));
    });
}
