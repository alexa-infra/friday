import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import alerts from './alerts';
import calendar from './events';
import docs from './docs';
import { authApi, bookmarkApi, eventApi, todoApi, recipeApi } from '../api';

export const reducers = combineReducers({
  alerts,
  calendar,
  docs,
  [authApi.reducerPath]: authApi.reducer,
  [bookmarkApi.reducerPath]: bookmarkApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [todoApi.reducerPath]: todoApi.reducer,
  [recipeApi.reducerPath]: recipeApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      bookmarkApi.middleware,
      eventApi.middleware,
      todoApi.middleware,
      recipeApi.middleware,
    ),
});

export default store;
