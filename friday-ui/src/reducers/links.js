import { Actions } from '../constants';

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
    case Actions.LINKS_SUCCESS:
      return { ...state, currentItem: null, items: action.data, allItems: action.data, filter: '' };
    case Actions.LINKS_FILTER: {
      const query = action.data;
      const filtered = state.allItems.filter(filterItems(query));
      return { ...state, items: filtered, filter: query };
    }
    case Actions.LINKS_SHOW_EDIT:
      return { ...state, currentItem: action.data, newLink: false, editDisabled: false };
    case Actions.LINKS_HIDE_EDIT:
      return { ...state, currentItem: null, newLink: false, editDisabled: true };
    case Actions.LINKS_EDIT_MODE:
      return { ...state, editMode: action.data, newLink: false };
    case Actions.LINKS_SHOW_NEW:
      return { ...state, newLink: true, editDisabled: false };
    case Actions.LINKS_NEW_REQUEST:
    case Actions.LINKS_EDIT_REQUEST:
    case Actions.LINKS_DELETE_REQUEST:
      return { ...state, editDisabled: true };
    case Actions.LINKS_NEW_FAILURE:
    case Actions.LINKS_EDIT_FAILURE:
    case Actions.LINKS_DELETE_FAILURE:
      return { ...state, editDisabled: false };
    case Actions.LINKS_NEW_SUCCESS:
    case Actions.LINKS_EDIT_SUCCESS:
    case Actions.LINKS_DELETE_SUCCESS:
      return { ...state, newLink: false, currentItem: null, editDisabled: false };
    default:
      return state;
  }
}
