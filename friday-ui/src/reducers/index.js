import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import links from './links';
import alerts from './alerts';
import auth from './auth';
import events from './events';

const reducers = combineReducers({
  routing: routerReducer,
  links: links,
  alerts: alerts,
  auth: auth,
  events: events,
})

export default reducers;
