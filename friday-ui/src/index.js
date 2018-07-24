import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Root } from './containers';
import configureStore, { history } from './store';
import registerServiceWorker from './registerServiceWorker';
import { auth } from './actions';

const store = configureStore();
store.dispatch(auth.preLoad());

ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'));
registerServiceWorker();
