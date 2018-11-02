import * as moment from 'moment'
import * as Actions from '../constants/bookmarks.actions';


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
    case Actions.LIST.SUCCESS:
      let { items } = action.data
      items = items.map(convertItem)
      return { ...state, ...action.data, items };
    case Actions.SELECT_PAGE:
      const page = action.data;
      const { pages } = state;
      if (page < 1 || page > pages)
        return state;
      return { ...state, page };
    case Actions.SELECT_PER_PAGE:
      const per_page = action.data;
      if (per_page < 0 || per_page > 100)
        return state;
      return { ...state, per_page, page: 1 };
    case Actions.FILTER:
      const search = action.data;
      return { ...state, search: search, page: 1 };
    case Actions.SHOW_EDIT:
      return { ...state, currentItem: action.data };
    case Actions.SHOW_NEW:
      return { ...state, currentItem: null, newItem: action.data || newItemInitial };
    case Actions.HIDE_EDIT:
      return { ...state, currentItem: null, newItem: null };
    case Actions.NEW.REQUEST:
    case Actions.EDIT.REQUEST:
    case Actions.DELETE.REQUEST:
      return { ...state, editDisabled: true };
    case Actions.NEW.SUCCESS:
    case Actions.EDIT.SUCCESS:
    case Actions.DELETE.SUCCESS:
      return { ...state, currentItem: null, newItem: null, editDisabled: false };
    case Actions.NEW.FAILURE:
    case Actions.EDIT.FAILURE:
    case Actions.DELETE.FAILURE:
      return { ...state, editDisabled: false };
    default:
      return state;
  }
}
