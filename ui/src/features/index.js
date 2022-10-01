import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import recipes from './recipes';
import alerts from './alerts';
import events from './events';
import docs from './docs';
import todo from './todo';
import { authApi, bookmarkApi } from '../api';

export const reducers = combineReducers({
  alerts,
  events,
  docs,
  recipes,
  todo,
  [authApi.reducerPath]: authApi.reducer,
  [bookmarkApi.reducerPath]: bookmarkApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      bookmarkApi.middleware,
    ),
});

export default store;
