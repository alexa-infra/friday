import * as moment from 'moment'
import { Actions } from '../constants'


const initialState = {
  items: [],
  page: 1,
  pages: 0,
  per_page: 10,
  total: 0,
  search: null,
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
    default:
      return state;
  }
}
