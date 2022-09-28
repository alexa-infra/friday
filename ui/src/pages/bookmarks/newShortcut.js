import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { showNew } from '../../features/bookmarks';

const BookmarksAddShortcut = ({ showEditNew }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title');
  const url = searchParams.get('url');
  React.useEffect(() => {
    showEditNew({ title, url });
  }, [showEditNew, title, url]);
  return <Navigate to="/bookmarks" />;
}

const BookmarksAddShortcutContainer = connect(
  null,
  (dispatch) => ({
    showEditNew: (val) => dispatch(showNew(val)),
  }),
)(BookmarksAddShortcut);

export default BookmarksAddShortcutContainer;
