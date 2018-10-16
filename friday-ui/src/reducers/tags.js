import { Actions } from '../constants'

const initialState = {
  items: [],
}

const formatTag = ({ name }) => name;

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.TAGS_LIST_SUCCESS:
      const items = action.data.map(formatTag);
      return { ...state, items };
    case Actions.TAGS_LIST_FAILURE:
    case Actions.TAGS_LIST_REQUEST:
      return { ...state, items: [] };
    default:
      return state;
  }
}
