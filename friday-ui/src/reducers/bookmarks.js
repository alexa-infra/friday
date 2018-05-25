import * as moment from 'moment'
import { Actions } from '../constants'


const initialState = {
  items: [],
  page: 1,
  pages: 0,
  per_page: 20,
  total: 0,
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
    default:
      return state;
  }
}
