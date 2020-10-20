import React from 'react';
import { Provider, useSelector, connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import Docs from '../docs';
import Login from '../login';
import Events from '../events';
import Links from '../links';
import Bookmarks from '../bookmarks';
import Recipes from '../kueche';

import { NavBar, Alerts, withOnLoad } from '../../components';
import { selectAuthorized, currentUser } from '../../features/auth';


function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector(selectAuthorized);
  return (
    <Route
      {...rest}
      render={({ location }) => (isAuthenticated ? (
        <Component />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}


let Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div className="theme-l5">
        <header>
          <NavBar />
        </header>
        <main className="container mt-2">
          <Alerts />
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/events" component={Events} />
            <PrivateRoute path="/bookmarks" component={Bookmarks} />
            <PrivateRoute path="/docs" component={Docs} />
            <PrivateRoute path="/recipes" component={Recipes} />
            <PrivateRoute path="/" component={Links} />
          </Switch>
        </main>
      </div>
    </Router>
  </Provider>
);

Root = withOnLoad(Root, (props) => props.onLoad());

Root = connect(
  null,
  (dispatch) => ({
    onLoad: () => dispatch(currentUser()),
  }),
)(Root);

export default Root;
