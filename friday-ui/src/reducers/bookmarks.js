import * as moment from 'moment'
import { Actions } from '../constants'


const initialState = {
  items: [],
  page: 1,
  pages: 0,
  per_page: 10,
  total: 0,
  search: null,
  currentItem: null,
  editDisabled: false,
  newItem: null,
}

const newItemInitial = {
  title: '',
  url: '',
  readed: false,
}

const parseDateTime = str => moment(str, moment.ISO_8601)

const convertItem = it => {
  return {
    ...it,
    created: parseDateTime(it.created),
    updated: parseDateTime(it.updated),
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.BOOKMARKS_SUCCESS:
      let { items } = action.data
      items = items.map(convertItem)
      return { ...state, ...action.data, items };
    case Actions.BOOKMARKS_SELECT_PAGE:
      const page = action.data;
      const { pages } = state;
      if (page < 1 || page > pages)
        return state;
      return { ...state, page };
    case Actions.BOOKMARKS_SELECT_PER_PAGE:
      const per_page = action.data;
      if (per_page < 0 || per_page > 100)
        return state;
      return { ...state, per_page, page: 1 };
    case Actions.BOOKMARKS_FILTER:
      const search = action.data;
      return { ...state, search: search, page: 1 };
    case Actions.BOOKMARKS_SHOW_EDIT:
      return { ...state, currentItem: action.data };
    case Actions.BOOKMARKS_SHOW_NEW:
      return { ...state, currentItem: null, newItem: action.data || newItemInitial };
    case Actions.BOOKMARKS_HIDE_EDIT:
      return { ...state, currentItem: null, newItem: null };
    case Actions.BOOKMARKS_NEW_REQUEST:
    case Actions.BOOKMARKS_EDIT_REQUEST:
    case Actions.BOOKMARKS_DELETE_REQUEST:
      return { ...state, editDisabled: true };
    case Actions.BOOKMARKS_NEW_SUCCESS:
    case Actions.BOOKMARKS_EDIT_SUCCESS:
    case Actions.BOOKMARKS_DELETE_SUCCESS:
      return { ...state, currentItem: null, newItem: null, editDisabled: false };
    case Actions.BOOKMARKS_NEW_FAILURE:
    case Actions.BOOKMARKS_EDIT_FAILURE:
    case Actions.BOOKMARKS_DELETE_FAILURE:
      return { ...state, editDisabled: false };
    default:
      return state;
  }
}
