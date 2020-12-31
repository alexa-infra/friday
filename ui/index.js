import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Modal from 'react-modal';
import { Root } from './pages';
import { store } from './features';

const appElement = document.getElementById('root');
ReactDOM.render(<Root store={store} />, appElement);
Modal.setAppElement(appElement);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.unregister();
  });
}
