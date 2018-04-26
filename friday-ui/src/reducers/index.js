import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import links from './links';
import alerts from './alerts';

const reducers = combineReducers({
  routing: routerReducer,
  links: links,
  alerts: alerts,
})

export default reducers;
