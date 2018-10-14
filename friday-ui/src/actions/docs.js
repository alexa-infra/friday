import * as api from '../api';
import { callApi } from './utils';


export const getDocs = callApi(api.getDocs, 'DOCS');
export const getDoc =  callApi(api.getDoc, 'DOCS_INFO');
export const updateDocText = callApi(api.putDocText, 'DOCS_EDIT_TEXT');
export const updateDoc = callApi(api.updateDoc, 'DOCS_EDIT');
export const getDocText = callApi(api.getDocText, 'DOCS_TEXT');
export const getDocHtml = callApi(api.getDocHtml, 'DOCS_HTML');
export const createDoc = callApi(api.createDoc, 'DOCS_NEW');
export const deleteDoc = callApi(api.deleteDoc, 'DOCS_DELETE');
