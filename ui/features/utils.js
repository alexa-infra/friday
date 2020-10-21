import { createSlice, createAsyncThunk as _createAsyncThunk } from '@reduxjs/toolkit';
import * as alerts from './alerts';
import { unauthorized } from './auth';


export const handleErrors = (err) => (dispatch) => {
  if (err.status !== undefined) {
    dispatch(alerts.error(err.message || err.status));
    if (err.status === 401) dispatch(unauthorized());
  } else {
    dispatch(alerts.error(err));
  }
};

export const createAsyncThunk = (type, payloadCreator) => _createAsyncThunk(type, async (arg, opt) => {
  const { dispatch } = opt;
  try {
    return await payloadCreator(arg, opt);
  } catch (err) {
    dispatch(handleErrors(err));
    throw err;
  }
});

export const makeCRUD = (name, { create, read, update, remove }) => ({
  listSlice: makeListSlice(name, read),
  newDialogSlice: makeNewDialogSlice(name, create),
  editDialogSlice: makeEditDialogSlice(name, update, remove),
});

const makeListSlice = (name, readAction) => createSlice({
  name: name + '/list',
  initialState: {
    items: [],
    page: 1,
    pages: 0,
    per_page: 100,
    total: 0,
    loading: 'idle',
    error: null,
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
    }
  },
  extraReducers: {
    [readAction.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.error = null;
      }
    },
    [readAction.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        const data = action.payload;
        state.items = data.items;
        state.page = data.page;
        state.per_page = data.per_page;
        state.pages = data.pages;
        state.total = data.total;
      }
    },
    [readAction.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.error;
      }
    },
  }
});


const makeNewDialogSlice = (name, createAction) => createSlice({
  name: name + '/newDialog',
  initialState: {
    item: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    show(state, action) {
      if (state.item === null) {
        state.item = action.payload;
        state.error = null;
      }
    },
    hide(state, action) {
      if (state.item !== null) {
        state.item = null;
      }
    }
  },
  extraReducers: {
    [createAction.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.error = null;
      }
    },
    [createAction.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.item = null;
        state.loading = 'idle';
      }
    },
    [createAction.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.error;
      }
    },
  }
});


const makeEditDialogSlice = (name, editAction, deleteAction) => createSlice({
  name: name + '/editDialog',
  initialState: {
    item: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    show(state, action) {
      if (state.item === null) {
        state.item = action.payload;
        state.error = null;
      }
    },
    hide(state, action) {
      if (state.item !== null) {
        state.item = null;
      }
    }
  },
  extraReducers: {
    [editAction.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.error = null;
      }
    },
    [editAction.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.item = null;
        state.loading = 'idle';
      }
    },
    [editAction.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.error;
      }
    },
    [deleteAction.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.error = null;
      }
    },
    [deleteAction.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.item = null;
        state.loading = 'idle';
      }
    },
    [deleteAction.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.error;
      }
    },
  }
});

export const selectPagination = (state) => ({
  search: state.search,
  page: state.page,
  pages: state.pages,
  per_page: state.per_page,
});

export const selectDialog = (state) => ({
  item: state.item,
  error: state.error,
  loading: state.loading === 'pending',
  show: state.item !== null,
});
