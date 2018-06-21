import * as moment from 'moment'
import { Actions } from '../constants';


const initialState = {
  currentItem: null,
  items: [],
};

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
    case Actions.DOCS_SUCCESS:
      let items = action.data;
      items = items.map(convertItem);
      return { ...state, items: items, currentItem: null };
    case Actions.DOCS_HTML_SUCCESS: {
      const { html } = action.data;
      const { currentItem } = state;
      return { ...state, currentItem: { ...currentItem, html }};
    }
    case Actions.DOCS_TEXT_SUCCESS: {
      const { text } = action.data;
      const { currentItem } = state;
      return { ...state, currentItem: { ...currentItem, text }};
    }
    case Actions.DOCS_INFO_SUCCESS: {
      const { currentItem } = state;
      return { ...state, currentItem: { ...currentItem, ...action.data }};
    }
    default:
      return state;
  }
}
