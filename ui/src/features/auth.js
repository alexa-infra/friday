import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import * as alerts from './alerts';

export const login = createAsyncThunk(
  'auth/login',
  async (args, { dispatch }) => {
    const response = await api.login(args);
    dispatch(alerts.success('Logged in'));
    return response;
  },
);

export const currentUser = createAsyncThunk(
  'auth/current-user', api.currentUser,
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: 'idle',
    user: {},
  },
  reducers: {
    unauthorized(state) {
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.error = null;
        state.user = null;
      }
    },
    [login.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.user = action.payload;
        state.loading = 'idle';
      }
    },
    [login.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.error = action.error;
        state.loading = 'idle';
      }
    },
    [currentUser.pending]: (state) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.error = null;
        state.user = null;
      }
    },
    [currentUser.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.user = action.payload;
        state.loading = 'idle';
      }
    },
    [currentUser.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.error = action.error;
        state.loading = 'idle';
      }
    },
  },
});

export default authSlice.reducer;

export const { unauthorized } = authSlice.actions;

export const selectAuthorized = (state) => state.auth.user !== null;

export const selectLoading = (state) => state.auth.loading === 'pending';
