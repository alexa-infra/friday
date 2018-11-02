import { requestActions } from './utils';

export const SELECT_MONTH = 'Events/SelectMonth';
export const SHOW_EDIT = 'Events/ShowEdit';
export const HIDE_EDIT = 'Events/HideEdit';
export const SHOW_EDIT_NEW = 'Events/ShowEditNew';
export const LIST = requestActions('Events/List');
export const NEW = requestActions('Events/New');
export const EDIT = requestActions('Events/Edit');
export const DELETE = requestActions('Events/Delete');
export const REPEAT = requestActions('Events/Repeat');
