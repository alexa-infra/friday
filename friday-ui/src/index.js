import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './pages';
import { store } from './features';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
