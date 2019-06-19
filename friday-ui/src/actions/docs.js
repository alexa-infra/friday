import * as api from '../api';
import { createAction, callApi, _callApi } from './utils';
import * as Actions from '../constants/docs.actions';


export const getDocs = _callApi((getState, data) => {
  const { docs } = getState();
  const { page, per_page, tag } = docs;
  return api.getDocs(tag, page, per_page);
}, Actions.LIST);

export const nextPage = () => (dispatch, getState) => {
  const { docs } = getState();
  const { page } = docs;
  return Promise.resolve(dispatch(createAction(Actions.SELECT_PAGE, page + 1)));
}

export const prevPage = () => (dispatch, getState) => {
  const { docs } = getState();
  const { page } = docs;
  return Promise.resolve(dispatch(createAction(Actions.SELECT_PAGE, page - 1)));
}

export const perPage = per_page => dispatch => {
  return Promise.resolve(dispatch(createAction(Actions.SELECT_PER_PAGE, per_page)));
}

export const filterByTag = tag => dispatch => {
  return Promise.resolve(dispatch(createAction(Actions.FILTER, tag)));
}

export const getDoc =  callApi(api.getDoc, Actions.INFO);
export const updateDocText = callApi(api.putDocText, Actions.EDIT_TEXT);
export const updateDoc = callApi(api.updateDoc, Actions.EDIT);
export const getDocText = callApi(api.getDocText, Actions.TEXT);
export const getDocHtml = callApi(api.getDocHtml, Actions.HTML);
export const createDoc = callApi(api.createDoc, Actions.NEW);
export const deleteDoc = callApi(api.deleteDoc, Actions.DELETE);
export const getDocsTagCloud = callApi(api.getDocsTagCloud, Actions.TAG_CLOUD);
