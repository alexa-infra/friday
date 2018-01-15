import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';

const configureStore = (history, initialState = {}) => {
  const middleware = applyMiddleware(routerMiddleware(history));
  const makeStore = compose(middleware)(createStore);
  const store = makeStore(reducers, initialState);
  return store;
};

export default configureStore;
