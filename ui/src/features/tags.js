import { createSlice, createSelector } from '@reduxjs/toolkit';
import { createAsyncThunk } from './utils';
import * as api from '../api';

export const getTags = createAsyncThunk('tags/list',
  async () => await api.getTags());

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    loading: 'idle',
    error: null,
    items: [],
  },
  reducers: {},
  extraReducers: {
    [getTags.pending]: (state) => {
      if (state.loading === 'idle') {
        state.error = null;
        state.loading = 'pending';
      }
    },
    [getTags.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.items = action.payload;
        state.loading = 'idle';
      }
    },
    [getTags.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.error = action.error;
        state.loading = 'idle';
      }
    },
  },
});

export default tagsSlice.reducer;

export const selectTags = createSelector(
  (state) => state.tags,
  (tags) => tags.map((tag) => tag.name),
);
