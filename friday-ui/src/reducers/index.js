import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import links from './links';
import alerts from './alerts';
import auth from './auth';

const reducers = combineReducers({
  routing: routerReducer,
  links: links,
  alerts: alerts,
  auth: auth,
})

export default reducers;
