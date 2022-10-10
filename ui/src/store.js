import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { alertsSlice, eventsSlice } from './slices';
import { authApi, bookmarkApi, eventApi, todoApi, recipeApi, tagApi, docApi } from './api';

const reducers = combineReducers({
  alerts: alertsSlice.reducer,
  calendar: eventsSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [bookmarkApi.reducerPath]: bookmarkApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [todoApi.reducerPath]: todoApi.reducer,
  [recipeApi.reducerPath]: recipeApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,
  [docApi.reducerPath]: docApi.reducer,
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
      tagApi.middleware,
      docApi.middleware,
    ),
});
