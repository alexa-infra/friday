import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import * as api from '../api';
import { handleErrors } from './utils';


export const getTodoList = createAsyncThunk(
  'todo-list/fetch',
  async (listid, { dispatch }) => {
    try {
      const info = await api.getTodoItem(listid);
      const items = await api.getTodoListItems(listid);
      return { info, items };
    } catch (err) {
      dispatch(handleErrors(err));
      throw err;
    }
  }
);

export const createTodoItem = createAsyncThunk(
  'todo-create/request',
  async (data, { dispatch }) => {
    try {
      return await api.createTodoItem(data);
    } catch (err) {
      dispatch(handleErrors(err));
      throw err;
    }
  }
);

export const changeTodoItem = createAsyncThunk(
  'todo-edit/request',
  async (data, { dispatch }) => {
    try {
      return await api.changeTodoItem(data);
    } catch (err) {
      dispatch(handleErrors(err));
      throw err;
    }
  }
);

export const removeTodoItem = createAsyncThunk(
  'todo-remove/request',
  async (data, { dispatch }) => {
    try {
      const { id } = data;
      await api.removeTodoItem(id);
      return { id };
    } catch (err) {
      dispatch(handleErrors(err));
      throw err;
    }
  }
);

export const markDone = createAsyncThunk(
  'todo-list/done',
  async (data, { dispatch }) => {
    try {
      const { id, done } = data;
      return await api.updateTodoItem({
        id,
        done: !done
      });
    } catch (err) {
      dispatch(handleErrors(err));
      throw err;
    }
  }
);

export const markFocus = createAsyncThunk(
  'todo-list/focus',
  async (data, { dispatch }) => {
    try {
      const { id, focus } = data;
      return await api.updateTodoItem({
        id,
        focus: !focus
      });
    } catch (err) {
      dispatch(handleErrors(err));
      throw err;
    }
  }
);

export const markDeleted = createAsyncThunk(
  'todo-list/deleted',
  async (data, { dispatch }) => {
    try {
      const { id, deleted } = data;
      return await api.updateTodoItem({
        id,
        deleted: !deleted
      });
    } catch (err) {
      dispatch(handleErrors(err));
      throw err;
    }
  }
);

const setPending = (state) => {
  state.isPending = true;
  state.error = null;
}

const setError = (state, action) => {
  state.isPending = false;
  state.error = action.error;
}

const replaceItem = (state, action) => {
  state.isPending = false;
  const item = action.payload;
  state.items = state.items.map(
    x => x.id === item.id ? item : x);
}

const todoListSlice = createSlice({
  name: 'todo-list',
  initialState: {
    info: {},
    items: [],
    isPending: false,
    error: null,
  },
  extraReducers: {
    [getTodoList.pending]: setPending,
    [markDone.pending]: setPending,
    [markFocus.pending]: setPending,
    [markDeleted.pending]: setPending,
    [removeTodoItem.pending]: setPending,
    [getTodoList.rejected]: setError,
    [markDone.rejected]: setError,
    [markFocus.rejected]: setError,
    [markDeleted.rejected]: setError,
    [removeTodoItem.rejected]: setError,
    [getTodoList.fulfilled]: (state, action) => {
      state.isPending = false;
      const { info, items } = action.payload;
      state.info = info;
      state.items = items;
    },
    [markDone.fulfilled]: replaceItem,
    [markFocus.fulfilled]: replaceItem,
    [changeTodoItem.fulfilled]: replaceItem,
    [markDeleted.fulfilled]: replaceItem,
    [removeTodoItem.fulfilled]: (state, action) => {
      state.isPending = false;
      const item = action.payload;
      state.items = state.items.filter(x => x.id !== item.id);
    },
    [createTodoItem.fulfilled]: (state, action) => {
      state.isPending = false;
      const item = action.payload;
      state.items.push(item);
    },
  }
});

export const selectList = createSelector(
  state => state.todo.list,
  ({info, items, isPending, error}) => {
    const activeItems = items.filter(x => !x.done && !x.deleted);
    const inactiveItems = items.filter(x => x.done || x.deleted);
    return {
      list: info,
      items: activeItems,
      doneItems: inactiveItems,
      isPending,
      error,
    };
  }
);

const makeDialog = (name, action) => createSlice({
  name,
  initialState: {
    item: null,
    isPending: false,
    error: null,
  },
  reducers: {
    show(state, action){
      state.item = action.payload;
      state.isPending = false;
      state.error = null;
    },
    hide(state){
      state.item = null;
      state.isPending = false;
      state.error = null;
    }
  },
  extraReducers: {
    [action.pending]: (state) => {
      state.isPending = true;
      state.error = null;
    },
    [action.rejected]: (state, action) => {
      state.isPending = false;
      state.error = action.error;
    },
    [action.fulfilled]: (state) => {
      state.isPending = false;
      state.item = null;
    },
  }
});

const todoCreateSlice = makeDialog('todo-create', createTodoItem);
const todoEditSlice = makeDialog('todo-edit', changeTodoItem);

export const { show: showCreateTodo, hide: hideCreateTodo } = todoCreateSlice.actions;
export const { show: showEditTodo, hide: hideEditTodo } = todoEditSlice.actions;

export default combineReducers({
  list: todoListSlice.reducer,
  create: todoCreateSlice.reducer,
  edit: todoEditSlice.reducer,
});

const selectDialog = state => ({
  ...state,
  open: state.item !== null,
});

export const selectCreateItem = createSelector(
  state => state.todo.create,
  selectDialog
);

export const selectEditItem = createSelector(
  state => state.todo.edit,
  selectDialog
);
