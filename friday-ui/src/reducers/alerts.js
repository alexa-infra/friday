import * as Actions from '../constants/alerts.actions';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.ADD: {
      const { id, message, type } = action.data;
      const newAlert = { id, message, type };
      return [...state, newAlert];
    }
    case Actions.DISMISS: {
      const { id } = action.data;
      return state.filter(it => it.id !== id);
    }
    default:
      return state;
  }
}
