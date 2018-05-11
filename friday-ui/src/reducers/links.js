import { Actions } from '../constants';

const initialState = {
  currentItem: null,
  items: [],
  allItems: [],
  filter: '',
};

const filterItems = term => item => {
  if (!item.title)
    return false;
  const text = item.title.replace(/\s+/g, ' ').toLowerCase();
  return ~text.indexOf(term);
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.LINKS_SUCCESS:
      return { ...state, currentItem: null, items: action.data, allItems: action.data, filter: '' };
    case Actions.LINKS_FILTER: {
      const query = action.data;
      const filtered = state.allItems.filter(filterItems(query));
      return { ...state, items: filtered, filter: query };
    }
    default:
      return state;
  }
}
