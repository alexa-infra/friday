import React from 'react';
import { Provider, useSelector, connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Routes, Navigate, useLocation
} from 'react-router-dom';

import Docs from '../docs';
import Login from '../login';
import Events from '../events';
import Links from '../links';
import Bookmarks from '../bookmarks';
import Recipes from '../kueche';
import { TodoList } from '../todo';

import { NavBar, Alerts, withOnLoad } from '../../components';
import { selectAuthorized, currentUser } from '../../features/auth';

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector(selectAuthorized);
  const location = useLocation();
  return isAuthenticated ? children : (
    <Navigate
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
}

let Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <header>
        <NavBar />
      </header>
      <main className="container mt-2 mx-auto">
        <Alerts />
        <Routes>
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/events" element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          } />
          <Route path="/bookmarks/*" element={
            <PrivateRoute>
              <Bookmarks />
            </PrivateRoute>
          } />
          <Route path="/docs/*" element={
            <PrivateRoute>
              <Docs />
            </PrivateRoute>
          } />
          <Route path="/recipes" element={
            <PrivateRoute>
              <Recipes />
            </PrivateRoute>
          } />
          <Route path="/todo" element={
            <PrivateRoute>
              <TodoList />
            </PrivateRoute>
          } />
          <Route path="/" element={
            <PrivateRoute>
              <Links />
            </PrivateRoute>
          } />
        </Routes>
      </main>
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
