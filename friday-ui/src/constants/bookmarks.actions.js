import { requestActions } from './utils';

export const LIST = requestActions('Bookmarks/List');
export const NEW = requestActions('Bookmarks/New');
export const EDIT = requestActions('Bookmarks/Edit');
export const DELETE = requestActions('Bookmarks/Delete');
export const SELECT_PAGE = 'Bookmarks/SelectPage';
export const SELECT_PER_PAGE = 'Bookmarks/SelectPerPage';
export const FILTER = 'Bookmarks/Filter';
export const SHOW_EDIT = 'Bookmarks/ShowEdit';
export const HIDE_EDIT = 'Bookmarks/HideEdit';
export const SHOW_NEW = 'Bookmarks/ShowNew';
