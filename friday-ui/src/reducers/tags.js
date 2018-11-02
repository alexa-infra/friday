import * as Actions from '../constants/tags.actions';

const initialState = {
  items: [],
}

const formatTag = ({ name }) => name;

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.LIST.SUCCESS:
      const items = action.data.map(formatTag);
      return { ...state, items };
    case Actions.LIST.FAILURE:
    case Actions.LIST.REQUEST:
      return { ...state, items: [] };
    default:
      return state;
  }
}
