import React from 'react';
import { Provider } from 'react-redux';
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
import Ratio from '../ratio';

import { NavBar, Alerts } from '../../components';
import { useCurrentUserQuery } from '../../api';

function PrivateRoute({ children }) {
  const location = useLocation();
  const { isLoading, isSuccess } = useCurrentUserQuery();
  if (isLoading) {
    return null;
  }
  return isSuccess ? children : (
    <Navigate
      to="/login"
      state={{
        from: location,
      }}
    />
  );
}

export const Root = ({ store }) => (
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
          <Route path="/ratio" element={
            <PrivateRoute>
              <Ratio />
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

export default Root;
