import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.css'
import { Root } from './pages';
import { store } from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
