import React from 'react';
import createBrowserHistory from "history/createBrowserHistory";
import ReactDOM from 'react-dom';
import './index.css';
import { Root } from './containers';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'));
registerServiceWorker();
