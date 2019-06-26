import * as moment from 'moment'
import * as Actions from '../constants/docs.actions';


const initialState = {
  currentItem: null,
  items: [],
  page: 1,
  pages: 0,
  per_page: 10,
  total: 0,
  tag: null,
  tagCloud: [],
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
      let { items } = action.data;
      items = items.map(convertItem);
      return { ...state, ...action.data, items, currentItem: null };
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
      const tag = action.data;
      return { ...state, tag: tag, page: 1 };
    case Actions.HTML.SUCCESS: {
      const html = action.data;
      const { currentItem } = state;
      return { ...state, currentItem: { ...currentItem, html }};
    }
    case Actions.TEXT.SUCCESS: {
      const text = action.data;
      const { currentItem } = state;
      return { ...state, currentItem: { ...currentItem, text }};
    }
    case Actions.INFO.SUCCESS: {
      const { currentItem } = state;
      return { ...state, currentItem: { ...currentItem, ...action.data }};
    }
    case Actions.TAG_CLOUD.SUCCESS: {
      return { ...state, tagCloud: action.data };
    }
    default:
      return state;
  }
}
