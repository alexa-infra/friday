import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.css'
import { Root } from './pages';
import configureStore, { history } from './store';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'));
registerServiceWorker();
