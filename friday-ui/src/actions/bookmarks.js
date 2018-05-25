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
