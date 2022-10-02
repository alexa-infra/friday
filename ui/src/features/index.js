import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import recipes from './recipes';
import alerts from './alerts';
import calendar from './events';
import docs from './docs';
import todo from './todo';
import { authApi, bookmarkApi, eventApi } from '../api';

export const reducers = combineReducers({
  alerts,
  calendar,
  docs,
  recipes,
  todo,
  [authApi.reducerPath]: authApi.reducer,
  [bookmarkApi.reducerPath]: bookmarkApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      bookmarkApi.middleware,
      eventApi.middleware,
    ),
});

export default store;
