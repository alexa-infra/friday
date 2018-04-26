import { Actions } from '../constants';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.ADD_ALERT: {
      const { id, message, type } = action.data;
      const newAlert = { id, message, type };
      return [...state, newAlert];
    }
    case Actions.DISMISS_ALERT: {
      const { id } = action.data;
      return state.filter(it => it.id !== id);
    }
    default:
      return state;
  }
}
