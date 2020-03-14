import { combineReducers } from 'redux';
import links from './links';
import alerts from './alerts';
import auth from './auth';
import events from './events';
import bookmarks from './bookmarks';
import docs from './docs';
import tags from './tags';
import recipes from './recipes';

const reducers = combineReducers({
  links: links,
  alerts: alerts,
  auth: auth,
  events: events,
  bookmarks: bookmarks,
  docs: docs,
  tags: tags,
  recipes: recipes,
})

export default reducers;
