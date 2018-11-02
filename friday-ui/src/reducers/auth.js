import { LOGIN } from '../constants/auth.actions';

const initialState = {
  user: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.REQUEST:
      return {...state, user: null};
    case LOGIN.SUCCESS:
      return {...state, user: action.data };
    case LOGIN.FAILURE:
      return {...state, user: null};
    default:
      return state;
  }
}
