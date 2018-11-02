import { LIST, NEW, EDIT, DELETE, SHOW_EDIT, HIDE_EDIT, SHOW_NEW, FILTER, EDIT_MODE } from '../constants/links.actions';

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
    case LIST.SUCCESS: {
      const { items } = action.data;
      return { ...state, currentItem: null, items: items, allItems: items, filter: '' };
    }
    case FILTER: {
      const query = action.data;
      const filtered = state.allItems.filter(filterItems(query));
      return { ...state, items: filtered, filter: query };
    }
    case SHOW_EDIT:
      return { ...state, currentItem: action.data, newLink: false, editDisabled: false };
    case HIDE_EDIT:
      return { ...state, currentItem: null, newLink: false, editDisabled: true };
    case EDIT_MODE:
      return { ...state, editMode: action.data, newLink: false };
    case SHOW_NEW:
      return { ...state, newLink: true, editDisabled: false };
    case NEW.REQUEST:
    case EDIT.REQUEST:
    case DELETE.REQUEST:
      return { ...state, editDisabled: true };
    case NEW.FAILURE:
    case EDIT.FAILURE:
    case DELETE.FAILURE:
      return { ...state, editDisabled: false };
    case NEW.SUCCESS:
    case EDIT.SUCCESS:
    case DELETE.SUCCESS:
      return { ...state, newLink: false, currentItem: null, editDisabled: false };
    default:
      return state;
  }
}
