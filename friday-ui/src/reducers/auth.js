import * as Actions from '../constants/auth.actions';

const initialState = {
  user: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOGIN.REQUEST:
      return {...state, user: null};
    case Actions.LOGIN.SUCCESS:
      return {...state, user: action.data };
    case Actions.LOGIN.FAILURE:
      return {...state, user: null};
    default:
      return state;
  }
}
