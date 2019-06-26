import { applyMiddleware, createStore, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const configureStore = (initialState = {}) => {
  const middleware = applyMiddleware(thunk,
                                     logger);
  const makeStore = compose(middleware)(createStore);
  const store = makeStore(reducers, initialState);
  return store;
};

export default configureStore;

export const history = createBrowserHistory();
