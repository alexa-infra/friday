import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux';
import createBrowserHistory from "history/createBrowserHistory";
import ReactDOM from 'react-dom';
import './index.css';
import { Root } from './containers';
import configureStore from './store';
import configureRoutes from './routes';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

const browserHistory = createBrowserHistory();
const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = configureRoutes(history);

ReactDOM.render(<Root store={store} routes={routes} />, document.getElementById('root'));
registerServiceWorker();
