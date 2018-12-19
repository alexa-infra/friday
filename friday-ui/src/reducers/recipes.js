import * as Actions from '../constants/recipes.actions';

const initialState = {
  data: [],
  items: [],
  loading: false,
}

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

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.LIST.SUCCESS: {
      const data = action.data;
      return { ...state, loading: false, data: data, items: remap(data) };
    }
    case Actions.LIST.REQUEST: {
      return { ...state, loading: true, data: [], items: [] };
    }
    case Actions.LIST.FAILURE: {
      return { ...state, loading: false };
    }
    case Actions.SHUFFLE: {
      return { ...state, items: remap(state.data) };
    }
    default:
      return state;
  }
}
