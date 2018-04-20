import { Actions } from '../constants';

const initialState = {
  currentItem: null,
  items: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.LINKS_SUCCESS:
      return { currentItem: null, items: action.data };
    default:
      return state;
  }
}
