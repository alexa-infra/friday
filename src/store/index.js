import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const configureStore = (history, initialState = {}) => {
  const middleware = applyMiddleware(routerMiddleware(history),
                                     thunk, logger);
  const makeStore = compose(middleware)(createStore);
  const store = makeStore(reducers, initialState);
  return store;
};

export default configureStore;