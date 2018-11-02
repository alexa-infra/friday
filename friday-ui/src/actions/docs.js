import * as api from '../api';
import { callApi } from './utils';
import * as Actions from '../constants/docs.actions';


export const getDocs = callApi(api.getDocs, Actions.LIST);
export const getDoc =  callApi(api.getDoc, Actions.INFO);
export const updateDocText = callApi(api.putDocText, Actions.EDIT_TEXT);
export const updateDoc = callApi(api.updateDoc, Actions.EDIT);
export const getDocText = callApi(api.getDocText, Actions.TEXT);
export const getDocHtml = callApi(api.getDocHtml, Actions.HTML);
export const createDoc = callApi(api.createDoc, Actions.NEW);
export const deleteDoc = callApi(api.deleteDoc, Actions.DELETE);
