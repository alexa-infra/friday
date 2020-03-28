import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';


export const login = createAsyncThunk(
  'auth/login',
  async args => await api.login(args)
)

export const currentUser = createAsyncThunk(
  'auth/current-user',
  async () => await api.currentUser()
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: 'idle',
    user: {},
  },
  reducers: {
  },
  extraReducers: {
    [login.pending]: (state, action) => {
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
      //dispatch(alerts.success('Logged in'));
      //history.push('/');
    },
    [login.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.error = action.error;
        state.loading = 'idle';
      }
    },
    [currentUser.pending]: (state, action) => {
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
    }
  }
});

export default authSlice.reducer;

export const selectAuthorized = state => state.auth.user !== null;

export const selectLoading = state => state.auth.loading === 'pending';
