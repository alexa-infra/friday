import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import links from './links';

const reducers = combineReducers({
  routing: routerReducer,
  links: links,
})

export default reducers;
