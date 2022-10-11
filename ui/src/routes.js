import React from 'react';
import {
  Route, Routes, Link
} from 'react-router-dom';
import { NavItem, NavBarBase, PrivateRoute } from './components';
import * as pages from './pages';

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={
      <pages.LoginPage />
    } />
    <Route path="/events" element={
      <PrivateRoute>
        <pages.EventsPage />
      </PrivateRoute>
    } />
    <Route path="/bookmarks/*" element={
      <PrivateRoute>
        <pages.BookmarksPage />
      </PrivateRoute>
    } />
    <Route path="/docs/*" element={
      <PrivateRoute>
        <pages.DocsPage />
      </PrivateRoute>
    } />
    <Route path="/recipes" element={
      <PrivateRoute>
        <pages.RecipesPage />
      </PrivateRoute>
    } />
    <Route path="/todo" element={
      <PrivateRoute>
        <pages.TodoPage />
      </PrivateRoute>
    } />
    <Route path="/ratio" element={
      <PrivateRoute>
        <pages.RatioPage />
      </PrivateRoute>
    } />
    <Route path="/" element={
      <PrivateRoute>
        <pages.LinksPage />
      </PrivateRoute>
    } />
  </Routes>
);

export const NavBar = () => (
  <NavBarBase>
    <NavItem>
      <Link to="/">Home</Link>
    </NavItem>
    <NavItem>
      <Link to="/bookmarks">ReadLater</Link>
    </NavItem>
    <NavItem>
      <Link to="/events">Events</Link>
    </NavItem>
    <NavItem>
      <Link to="/docs">Docs</Link>
    </NavItem>
    <NavItem>
      <Link to="/todo">Todo</Link>
    </NavItem>
    <NavItem>
      <Link to="/recipes">Recipes</Link>
    </NavItem>
    <NavItem>
      <Link to="/ratio">Ratio</Link>
    </NavItem>
  </NavBarBase>
);
