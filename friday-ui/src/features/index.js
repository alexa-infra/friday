import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import recipes from './recipes';
import auth from './auth';
import alerts from './alerts';
import links from './links';
import events from './events';
import bookmarks from './bookmarks';
import docs from './docs';

export const reducers = combineReducers({
  links,
  alerts,
  auth,
  events,
  bookmarks,
  docs,
  recipes,
});

export const store = configureStore({
  reducer: reducers,
});

export default store;
