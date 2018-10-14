import * as api from '../api';
import { callApi } from './utils';


export const getLinks = callApi(api.getLinks, 'LINKS');
export const createLink = callApi(api.createLink, 'LINKS_NEW');
export const updateLink = callApi(api.updateLink, 'LINKS_EDIT');
export const deleteLink = callApi(api.deleteLink, 'LINKS_DELETE');
