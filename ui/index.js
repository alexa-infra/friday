import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Root } from './pages';
import { store } from './features';

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.unregister();
  });
}
