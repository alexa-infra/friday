import { requestActions } from './utils';

export const LIST = requestActions('Links/List');
export const FILTER = 'Links/Filter';
export const NEW = requestActions('Links/New');
export const EDIT = requestActions('Links/Edit');
export const DELETE = requestActions('Links/Delete');
export const SHOW_EDIT = 'Links/ShowEdit';
export const HIDE_EDIT = 'Links/HideEdit';
export const SHOW_NEW = 'Links/ShowNew';
export const EDIT_MODE = 'Links/EditMode';
