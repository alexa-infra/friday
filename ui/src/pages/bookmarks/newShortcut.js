import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const BookmarksAddShortcut = ({ showEditNew }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title');
  const url = searchParams.get('url');
  if (!title || !url) {
    return <Navigate to="/bookmarks" />;
  }
  return <Navigate to="/bookmarks" state={{
    newItem: { title, url, readed: false, favorite: false },
  }} />;
}
