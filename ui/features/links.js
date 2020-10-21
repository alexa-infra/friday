import { createSlice, createSelector } from '@reduxjs/toolkit';
import { createAsyncThunk } from './utils';
import * as api from '../api';


export const getLinks = createAsyncThunk('links/list', api.getLinks);
export const createLink = createAsyncThunk('links/new', api.createLink);
export const updateLink = createAsyncThunk('links/update', api.updateLink);
export const deleteLink = createAsyncThunk('links/delete', api.deleteLink);

const searchField = (text) => text.replace(/\s+/g, ' ').toLowerCase();

const linksSlice = createSlice({
  name: 'links',
  initialState: {
    loading: 'idle',
    error: null,
    editMode: false,
    filter: '',
    items: [],
    newDialog: {
      loading: 'idle',
      item: null,
      error: null,
    },
    editDialog: {
      loading: 'idle',
      item: null,
      error: null,
    },
  },
  reducers: {
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
    toggleEditMode(state, action) {
      state.editMode = !state.editMode;
    },
    filterItems(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [getLinks.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.items = [];
        state.loading = 'pending';
      }
    },
    [getLinks.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        const { items: data } = action.payload;
        state.items = data.map(
          (x) => ({
            ...x,
            slug: searchField(x.title),
          }),
        );
        state.loading = 'idle';
      }
    },
    [getLinks.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.error = action.error;
        state.loading = 'pending';
      }
    },
    [createLink.pending]: (state, action) => {
      if (state.newDialog.loading === 'idle') {
        state.newDialog.loading = 'pending';
      }
    },
    [createLink.fulfilled]: (state, action) => {
      if (state.newDialog.loading === 'pending') {
        state.newDialog.item = null;
        state.newDialog.loading = 'idle';
      }
    },
    [createLink.rejected]: (state, action) => {
      if (state.newDialog.loading === 'pending') {
        state.newDialog.error = action.error;
        state.newDialog.loading = 'idle';
      }
    },
    [updateLink.pending]: (state, action) => {
      if (state.editDialog.loading === 'idle') {
        state.editDialog.loading = 'pending';
      }
    },
    [updateLink.fulfilled]: (state, action) => {
      if (state.editDialog.loading === 'pending') {
        state.editDialog.item = null;
        state.editDialog.loading = 'idle';
      }
    },
    [updateLink.rejected]: (state, action) => {
      if (state.editDialog.loading === 'pending') {
        state.editDialog.error = action.error;
        state.editDialog.loading = 'idle';
      }
    },
    [deleteLink.pending]: (state, action) => {
      if (state.editDialog.loading === 'idle') {
        state.editDialog.loading = 'pending';
      }
    },
    [deleteLink.fulfilled]: (state, action) => {
      if (state.editDialog.loading === 'pending') {
        state.editDialog.item = null;
        state.editDialog.loading = 'idle';
      }
    },
    [deleteLink.rejected]: (state, action) => {
      if (state.editDialog.loading === 'pending') {
        state.editDialog.error = action.error;
        state.editDialog.loading = 'idle';
      }
    },
  },
});

export default linksSlice.reducer;

const filterTerm = (term) => (item) => {
  if (!item.slug) return false;
  return ~item.slug.indexOf(term);
};

const selectLinks = createSelector(
  (state) => state.links.items,
  (state) => state.links.filter,
  (items, term) => items.filter(filterTerm(term)),
);

export const selectList = createSelector(
  selectLinks,
  (state) => state.links.editMode,
  (items, editMode) => ({ items, editMode }),
);

export const selectDialog = (dialog) => ({
  item: dialog.item,
  error: dialog.error,
  loading: dialog.loading === 'pending',
  show: dialog.item !== null,
});

export const selectEditDialog = createSelector(
  (state) => state.links.editDialog,
  selectDialog,
);

export const selectNewDialog = createSelector(
  (state) => state.links.newDialog,
  selectDialog,
);

export const {
  toggleEditMode, filterItems, showNew, hideNew, showEdit, hideEdit,
} = linksSlice.actions;
