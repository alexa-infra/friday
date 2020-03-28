import { configureStore } from "@reduxjs/toolkit";
import reducers from '../features';

export const store = configureStore({
  reducer: reducers,
});
