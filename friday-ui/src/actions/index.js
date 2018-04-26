import * as api from '../api';
import { Actions } from '../constants';
import { createAction } from './utils';
import * as alerts from './alerts';


export const getLinks = (page = 1) => dispatch => {
  dispatch(createAction(Actions.LINKS_REQUEST));
  api.getLinks(page)
    .then(result => dispatch(createAction(Actions.LINKS_SUCCESS, result.items)))
    .catch(error => dispatch(createAction(Actions.LINKS_FAILURE, { error })));
}

export { alerts };
