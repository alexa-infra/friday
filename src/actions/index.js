import * as api from '../api';
import { Actions } from '../constants';
import { createAction } from './utils';


export const getLinks = (page = 1) => {
  return (dispatch) => {
    dispatch(createAction(Actions.LINKS_REQUEST));
    api.getLinks(page)
      .then(result => dispatch(createAction(Actions.LINKS_SUCCESS, result.rows)))
      .catch(result => dispatch(createAction(Actions.LINKS_FAILURE)));
  };
}
