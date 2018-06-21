import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import links from './links';
import alerts from './alerts';
import auth from './auth';
import events from './events';
import bookmarks from './bookmarks';
import docs from './docs';

const reducers = combineReducers({
  routing: routerReducer,
  links: links,
  alerts: alerts,
  auth: auth,
  events: events,
  bookmarks: bookmarks,
  docs: docs,
})

export default reducers;
