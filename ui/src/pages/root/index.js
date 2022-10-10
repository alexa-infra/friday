import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Route, Routes, Navigate, useLocation
} from 'react-router-dom';

import { DocsPage } from '../docs';
import { LoginPage } from '../login';
import { EventsPage } from '../events';
import { LinksPage } from '../links';
import { BookmarksPage } from '../bookmarks';
import { RecipesPage } from '../kueche';
import { TodoPage } from '../todo';
import { RatioPage } from '../ratio';

import { NavBar, AlertList } from '../../components';
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
        <AlertList />
        <Routes>
          <Route path="/login" element={
            <LoginPage />
          } />
          <Route path="/events" element={
            <PrivateRoute>
              <EventsPage />
            </PrivateRoute>
          } />
          <Route path="/bookmarks/*" element={
            <PrivateRoute>
              <BookmarksPage />
            </PrivateRoute>
          } />
          <Route path="/docs/*" element={
            <PrivateRoute>
              <DocsPage />
            </PrivateRoute>
          } />
          <Route path="/recipes" element={
            <PrivateRoute>
              <RecipesPage />
            </PrivateRoute>
          } />
          <Route path="/todo" element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          } />
          <Route path="/ratio" element={
            <PrivateRoute>
              <RatioPage />
            </PrivateRoute>
          } />
          <Route path="/" element={
            <PrivateRoute>
              <LinksPage />
            </PrivateRoute>
          } />
        </Routes>
      </main>
    </Router>
  </Provider>
);
