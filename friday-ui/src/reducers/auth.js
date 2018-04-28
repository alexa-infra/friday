import { Actions } from '../constants';

const initialState = {
  token: window.localStorage.getItem('jwt'),
  user: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.AUTH_SESSION_EXPIRE:
      window.localStorage.setItem('jwt', null);
      return {...state, token: null, user: null};
    case Actions.AUTH_LOGIN_REQUEST:
      window.localStorage.setItem('jwt', null);
      return {...state, token: null, user: null};
    case Actions.AUTH_LOGIN_SUCCESS:
      const { token, user } = action.data;
      window.localStorage.setItem('jwt', token);
      return {...state, token, user };
    case Actions.AUTH_LOGIN_FAILURE:
      return {...state, token: null, user: null};
    default:
      return state;
  }
}
