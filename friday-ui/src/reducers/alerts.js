import { ADD, DISMISS } from '../constants/alerts.actions';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD: {
      const { id, message, type } = action.data;
      const newAlert = { id, message, type };
      return [...state, newAlert];
    }
    case DISMISS: {
      const { id } = action.data;
      return state.filter(it => it.id !== id);
    }
    default:
      return state;
  }
}
