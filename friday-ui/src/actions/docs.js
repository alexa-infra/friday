import * as api from '../api';
import { callApiAuth } from './utils';


export const getDocs = callApiAuth(api.getDocs, 'DOCS');
export const getDoc =  callApiAuth(api.getDoc, 'DOCS_INFO');
export const updateDocText = callApiAuth(api.putDocText, 'DOCS_EDIT_TEXT');
export const updateDoc = callApiAuth(api.updateDoc, 'DOCS_EDIT');
export const getDocText = callApiAuth(api.getDocText, 'DOCS_TEXT');
export const getDocHtml = callApiAuth(api.getDocHtml, 'DOCS_HTML');
export const createDoc = callApiAuth(api.createDoc, 'DOCS_NEW');
export const deleteDoc = callApiAuth(api.deleteDoc, 'DOCS_DELETE');
