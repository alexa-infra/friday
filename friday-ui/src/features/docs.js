import { createSlice, createSelector } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import * as api from '../api';
import { createAsyncThunk } from './utils';
import dayjs from 'dayjs';

export const getDocs = createAsyncThunk('docs/list',
  async (arg, {getState}) => {
    const pagination = selectPagination(getState());
    return await api.getDocs(pagination);
  }
);
export const getDocTags = createAsyncThunk('doc-tags/list',
  async () => await api.getDocsTagCloud()
);
const _getDoc = createAsyncThunk('doc/get', api.getDoc);
const _getDocText = createAsyncThunk('doc/getText', api.getDocText);
const _getDocHtml = createAsyncThunk('doc/getHtml', api.getDocHtml);
export const createDoc = createAsyncThunk('doc/create',
  async arg => {
    const { text } = arg;
    const { id } = await api.createDoc(arg);
    return await api.putDocText({ id, text });
  });
export const updateDoc = createAsyncThunk('doc/update',
  async arg => {
    const { id, text } = arg;
    await api.updateDoc(arg);
    return await api.putDocText({ id, text });
  });
export const deleteDoc = createAsyncThunk('doc/delete', api.deleteDoc);

const docsSlice = createSlice({
  name: 'docs',
  initialState: {
    loading: 'idle',
    error: null,
    items: [],
    page: 1,
    pages: 0,
    per_page: 10,
    total: 0,
    tag: null,
  },
  reducers: {
    setPage(state, action) {
      const page = action.payload;
      if (page > 0 && page <= state.pages)
        state.page = page;
    },
    setPerPage(state, action) {
      const per_page = action.payload;
      if (per_page > 0 && per_page <= 100) {
        state.per_page = per_page;
        state.page = 1;
      }
    },
    filterByTag(state, action) {
      state.tag = action.payload;
    }
  },
  extraReducers: {
    [getDocs.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.error = null;
        state.loading = 'pending';
      }
    },
    [getDocs.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        const data = action.payload;
        state.items = data.items;
        state.page = data.page;
        state.per_page = data.per_page;
        state.pages = data.pages;
      }
    },
    [getDocs.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.error = action.error;
        state.loading = 'idle';
      }
    }
  }
});

const setPending = (state, action) => {
  if (state.loading === 'idle') {
    state.error = null;
    state.loading = 'pending';
  }
}

const setError = (state, action) => {
  if (state.loading === 'pending') {
    state.error = action.error;
    state.loading = 'idle';
  }
}

const docSlice = createSlice({
  name: 'doc',
  initialState: {
    loading: 'idle',
    error: null,
    item: null,
    saved: false,
  },
  reducers: {
    getNew(state, action) {
      state.item = {};
    },
  },
  extraReducers: {
    [getDocs.pending]: (state, action) => {
      state.item = null;
      state.saved = false;
    },
    [_getDoc.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.item = action.meta.arg;
        state.loading = 'pending';
      }
    },
    [_getDoc.rejected]: setError,
    [_getDoc.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.item = action.payload;
      }
    },
    [_getDocText.pending]: setPending,
    [_getDocText.rejected]: setError,
    [_getDocText.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.item.text = action.payload;
      }
    },
    [_getDocHtml.pending]: setPending,
    [_getDocHtml.rejected]: setError,
    [_getDocHtml.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.item.html = action.payload;
      }
    },
    [updateDoc.pending]: setPending,
    [updateDoc.rejected]: setError,
    [updateDoc.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.item = null;
        state.saved = true;
      }
    },
    [createDoc.pending]: setPending,
    [createDoc.rejected]: setError,
    [createDoc.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.item = null;
        state.saved = true;
      }
    },
    [deleteDoc.pending]: setPending,
    [deleteDoc.rejected]: setError,
    [deleteDoc.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.item = null;
        state.saved = true;
      }
    },
  },
});

const docTagsSlice = createSlice({
  name: 'doc-tags',
  initialState: {
    loading: 'idle',
    error: null,
    items: [],
  },
  reducers: {},
  extraReducers: {
    [getDocTags.pending]: setPending,
    [getDocTags.rejected]: setError,
    [getDocTags.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.items = action.payload;
        state.loading = 'idle';
      }
    },
  },
});

export default combineReducers({
  list: docsSlice.reducer,
  current: docSlice.reducer,
  tags: docTagsSlice.reducer,
});

export const selectPagination = createSelector(
  state => state.docs.list,
  state => ({
    page: state.page,
    pages: state.pages,
    per_page: state.per_page,
    tag: state.tag,
  })
);

export const selectCurrentTag = createSelector(
  selectPagination,
  pagination => pagination.tag
);

export const selectList = createSelector(
  state => state.docs.list.items,
  items => items.map(x => ({
    ...x,
    created: dayjs(x.created),
    updated: dayjs(x.updated),
  }))
);

export const selectCurrent = state => state.docs.current;
export const selectDocTags = state => state.docs.tags.items;

const { setPerPage: _setPerPage, setPage: _setPage, filterByTag: _filterByTag } = docsSlice.actions;

export const nextPage = () => (dispatch, getState) => {
  const pagination = selectPagination(getState());
  dispatch(_setPage(pagination.page + 1));
  return dispatch(getDocs());
}

export const prevPage = () => (dispatch, getState) => {
  const pagination = selectPagination(getState());
  dispatch(_setPage(pagination.page - 1));
  return dispatch(getDocs());
}

export const setPerPage = value => dispatch => {
  dispatch(_setPerPage(value));
  return dispatch(getDocs());
}

export const filterByTag = value => dispatch => {
  dispatch(_filterByTag(value));
  return dispatch(getDocs());
}

export const getDocHtml = id => dispatch => {
  return dispatch(_getDoc({ id })).then(() => dispatch(_getDocHtml({ id })));
}

export const getDocText = id => dispatch => {
  return dispatch(_getDoc({ id })).then(() => dispatch(_getDocText({ id })));
}

export const { getNew } = docSlice.actions;
