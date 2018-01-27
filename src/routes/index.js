import React from 'react';
import { Router, Route, NavLink } from 'react-router-dom';
import { LinksPage } from '../containers';

const NavBar = () => (
  <div className="navbar navbar-inverse">
    <div className="container">
      <div className="navbar-header">
        <NavLink className="navbar-brand" to="/">Reader</NavLink>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li>
            <NavLink activeClassName="active" to="/read-later">Read Later</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/docs">Docs</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

const configureRoutes = (history) => (
  <Router history={history}>
    <div>
      <NavBar />
      <Route path="/" component={LinksPage} />
    </div>
  </Router>
)

export default configureRoutes;
