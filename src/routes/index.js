import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Links } from '../containers';

const configureRoutes = (history) => (
  <Router history={history}>
    <Route path="/" component={Links} />
  </Router>
)

export default configureRoutes;
