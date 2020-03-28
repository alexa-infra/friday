import { createSlice, createSelector } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as api from '../api';
import { selectDialog } from './links';
import { createAsyncThunk } from './utils';

dayjs.extend(relativeTime);


export const getBookmarks = createAsyncThunk(
  'bookmarks/list',
  async (arg, { getState }) => {
    const pagination = selectPagination(getState());
    return await api.getBookmarks(pagination);
  },
);

export const createBookmark = createAsyncThunk('bookmarks/new', api.createBookmark);
export const updateBookmark = createAsyncThunk('bookmarks/edit', api.updateBookmark);
export const deleteBookmark = createAsyncThunk('bookmarks/delete', api.deleteBookmark);

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    items: [],
    page: 1,
    pages: 0,
    per_page: 10,
    total: 0,
    search: null,
    loading: 'idle',
    error: null,
    newDialog: {
      item: null,
      error: null,
      loading: 'idle',
    },
    editDialog: {
      item: null,
      error: null,
      loading: 'idle',
    },
  },
  reducers: {
    setPage(state, action) {
      const page = action.payload;
      if (page > 0 && page <= state.pages) state.page = page;
    },
    setPerPage(state, action) {
      const per_page = action.payload;
      if (per_page > 0 && per_page <= 100) {
        state.per_page = per_page;
        state.page = 1;
      }
    },
    setFilter(state, action) {
      state.search = action.payload;
    },
    showEdit(state, action) {
      if (state.editDialog.item === null) {
        state.editDialog.item = action.payload;
        state.editDialog.error = null;
      }
    },
    hideEdit(state, action) {
      if (state.editDialog.item !== null) {
        state.editDialog.item = null;
      }
    },
    showNew(state, action) {
      if (state.newDialog.item === null) {
        state.newDialog.item = action.payload;
        state.newDialog.error = null;
      }
    },
    hideNew(state, action) {
      if (state.newDialog.item !== null) {
        state.newDialog.item = null;
      }
    },
  },
  extraReducers: {
    [getBookmarks.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.error = null;
      }
    },
    [getBookmarks.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        const data = action.payload;
        state.items = data.items;
        state.page = data.page;
        state.per_page = data.per_page;
        state.pages = data.pages;
      }
    },
    [getBookmarks.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.error;
      }
    },
    [createBookmark.pending]: (state, action) => {
      if (state.newDialog.loading === 'idle') {
        state.newDialog.loading = 'pending';
      }
    },
    [createBookmark.fulfilled]: (state, action) => {
      if (state.newDialog.loading === 'pending') {
        state.newDialog.item = null;
        state.newDialog.loading = 'idle';
      }
    },
    [createBookmark.rejected]: (state, action) => {
      if (state.newDialog.loading === 'pending') {
        state.newDialog.error = action.error;
        state.newDialog.loading = 'idle';
      }
    },
    [updateBookmark.pending]: (state, action) => {
      if (state.editDialog.loading === 'idle') {
        state.editDialog.loading = 'pending';
      }
    },
    [updateBookmark.fulfilled]: (state, action) => {
      if (state.editDialog.loading === 'pending') {
        state.editDialog.item = null;
        state.editDialog.loading = 'idle';
      }
    },
    [updateBookmark.rejected]: (state, action) => {
      if (state.editDialog.loading === 'pending') {
        state.editDialog.error = action.error;
        state.editDialog.loading = 'idle';
      }
    },
    [deleteBookmark.pending]: (state, action) => {
      if (state.editDialog.loading === 'idle') {
        state.editDialog.loading = 'pending';
      }
    },
    [deleteBookmark.fulfilled]: (state, action) => {
      if (state.editDialog.loading === 'pending') {
        state.editDialog.item = null;
        state.editDialog.loading = 'idle';
      }
    },
    [deleteBookmark.rejected]: (state, action) => {
      if (state.editDialog.loading === 'pending') {
        state.editDialog.error = action.error;
        state.editDialog.loading = 'idle';
      }
    },
  },
});

export default bookmarksSlice.reducer;

export const selectPagination = createSelector(
  (state) => state.bookmarks,
  (state) => ({
    search: state.search,
    page: state.page,
    pages: state.pages,
    per_page: state.per_page,
  }),
);

export const {
  showNew, hideNew, showEdit, hideEdit,
} = bookmarksSlice.actions;
const { setPerPage: _setPerPage, setFilter: _setFilter, setPage: _setPage } = bookmarksSlice.actions;

export const nextPage = () => (dispatch, getState) => {
  const pagination = selectPagination(getState());
  dispatch(_setPage(pagination.page + 1));
  return dispatch(getBookmarks());
};

export const prevPage = () => (dispatch, getState) => {
  const pagination = selectPagination(getState());
  dispatch(_setPage(pagination.page - 1));
  return dispatch(getBookmarks());
};

export const setPerPage = (value) => (dispatch) => {
  dispatch(_setPerPage(value));
  return dispatch(getBookmarks());
};

export const setFilter = (value) => (dispatch) => {
  dispatch(_setFilter(value));
  return dispatch(getBookmarks());
};

export const markReadBookmark = (data) => (dispatch) => {
  const newData = { ...data, readed: !data.readed };
  return dispatch(updateBookmark(newData));
};

export const selectList = createSelector(
  (state) => state.bookmarks.items,
  (items) => items.map((it) => ({
    ...it,
    created: dayjs(it.created),
    updated: dayjs(it.updated),
  })),
);

export const selectEditDialog = createSelector(
  (state) => state.bookmarks.editDialog,
  selectDialog,
);

export const selectNewDialog = createSelector(
  (state) => state.bookmarks.newDialog,
  selectDialog,
);
