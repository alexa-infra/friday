import * as moment from 'moment'
import * as Actions from '../constants/docs.actions';


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
    case Actions.LIST.SUCCESS:
      let items = action.data;
      items = items.map(convertItem);
      return { ...state, items: items, currentItem: null };
    case Actions.HTML.SUCCESS: {
      const { html } = action.data;
      const { currentItem } = state;
      return { ...state, currentItem: { ...currentItem, html }};
    }
    case Actions.TEXT.SUCCESS: {
      const { text } = action.data;
      const { currentItem } = state;
      return { ...state, currentItem: { ...currentItem, text }};
    }
    case Actions.INFO.SUCCESS: {
      const { currentItem } = state;
      return { ...state, currentItem: { ...currentItem, ...action.data }};
    }
    default:
      return state;
  }
}
