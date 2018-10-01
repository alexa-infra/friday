import { Actions } from '../constants';

const initialState = {
  user: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.AUTH_LOGIN_REQUEST:
      return {...state, user: null};
    case Actions.AUTH_LOGIN_SUCCESS:
      return {...state, user: action.data };
    case Actions.AUTH_LOGIN_FAILURE:
      return {...state, user: null};
    default:
      return state;
  }
}
