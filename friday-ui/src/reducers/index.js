import { combineReducers } from 'redux';
import links from './links';
import alerts from './alerts';
import auth from './auth';
import events from './events';
import bookmarks from './bookmarks';
import docs from './docs';
import tags from './tags';
import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
  links: links,
  alerts: alerts,
  auth: auth,
  events: events,
  bookmarks: bookmarks,
  docs: docs,
  form: formReducer,
  tags: tags,
})

export default reducers;
