import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';


const getRandomElement = (arr) => {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

const shuffle = (arr) => {
  return arr
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}

const convert = it => {
  const title = getRandomElement(it.names);
  const img = getRandomElement(it.images);
  return {
    ...it,
    ...img,
    title
  };
}

const remap = items => shuffle(items.map(convert));

export const getRecipes = createAsyncThunk('recipes/list', api.getRecipes);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    loading: 'idle',
    error: null,
    items: [],
    originalItems: [],
  },
  reducers: {
    shuffleRecipes(state, action) {
      state.items = remap(state.originalItems);
    }
  },
  extraReducers: {
    [getRecipes.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.items = [];
        state.originalItems = [];
        state.error = null;
      }
    },
    [getRecipes.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.originalItems = action.payload;
        state.items = remap(state.originalItems);
      }
    },
    [getRecipes.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.error;
      }
    }
  }
});

export default recipesSlice.reducer;

export const selectList = state => state.recipes.items;

export const { shuffleRecipes } = recipesSlice.actions;
