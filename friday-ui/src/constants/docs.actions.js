import { requestActions } from './utils';

export const LIST = requestActions('Docs/List');
export const INFO = requestActions('Docs/Info');
export const TEXT = requestActions('Docs/Text');
export const HTML = requestActions('Docs/Html');
export const EDIT = requestActions('Docs/Edit');
export const EDIT_TEXT = requestActions('Docs/EditText');
export const NEW = requestActions('Docs/New');
export const DELETE = requestActions('Docs/Delete');
export const TAG_CLOUD = requestActions('Docs/TagCloud');
export const SELECT_PAGE = 'Docs/SelectPage';
export const SELECT_PER_PAGE = 'Docs/SelectPerPage';
export const FILTER = 'Docs/Filter';
