import * as Actions from '../constants/links.actions';

const initialState = {
  currentItem: null,
  items: [],
  allItems: [],
  filter: '',
  editMode: false,
  newLink: false,
  editDisabled: false,
};

const filterItems = term => item => {
  if (!item.title)
    return false;
  const text = item.title.replace(/\s+/g, ' ').toLowerCase();
  return ~text.indexOf(term);
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.LIST.SUCCESS: {
      const { items } = action.data;
      return { ...state, currentItem: null, items: items, allItems: items, filter: '' };
    }
    case Actions.FILTER: {
      const query = action.data;
      const filtered = state.allItems.filter(filterItems(query));
      return { ...state, items: filtered, filter: query };
    }
    case Actions.SHOW_EDIT:
      return { ...state, currentItem: action.data, newLink: false, editDisabled: false };
    case Actions.HIDE_EDIT:
      return { ...state, currentItem: null, newLink: false, editDisabled: true };
    case Actions.EDIT_MODE:
      return { ...state, editMode: action.data, newLink: false };
    case Actions.SHOW_NEW:
      return { ...state, newLink: true, editDisabled: false };
    case Actions.NEW.REQUEST:
    case Actions.EDIT.REQUEST:
    case Actions.DELETE.REQUEST:
      return { ...state, editDisabled: true };
    case Actions.NEW.FAILURE:
    case Actions.EDIT.FAILURE:
    case Actions.DELETE.FAILURE:
      return { ...state, editDisabled: false };
    case Actions.NEW.SUCCESS:
    case Actions.EDIT.SUCCESS:
    case Actions.DELETE.SUCCESS:
      return { ...state, newLink: false, currentItem: null, editDisabled: false };
    default:
      return state;
  }
}
