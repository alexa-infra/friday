import * as api from '../api';
import { callApiAuth } from './utils';


export const getLinks = callApiAuth(api.getLinks, 'LINKS');
export const createLink = callApiAuth(api.createLink, 'LINKS_NEW');
export const updateLink = callApiAuth(api.updateLink, 'LINKS_EDIT');
export const deleteLink = callApiAuth(api.deleteLink, 'LINKS_DELETE');
