import React from 'react';
import { Router, Route } from 'react-router-dom';
import App from '../App';

const configureRoutes = (history) => (
  <Router history={history}>
    <Route path="/" component={App} />
  </Router>
)

export default configureRoutes;
