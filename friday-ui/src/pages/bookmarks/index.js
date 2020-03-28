import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import BookmarksAddShortcut from './newShortcut';
import Controls from './controls';
import List from './list';
import Pagination from './pagination';
import BrowserBookmark from './browserBookmark';
import EditForm from './editForm';
import NewForm from './newForm';
import { getBookmarks } from '../../features/bookmarks';
import { withOnLoad } from '../../components';
import './style.scss';


let BookmarksPage = () => (
  <div className="bookmarks-page">
    <Controls />
    <List />
    <Pagination />
    <BrowserBookmark />
    <EditForm />
    <NewForm />
  </div>
);

BookmarksPage = withOnLoad(BookmarksPage, (props) => props.onLoad());

BookmarksPage = connect(
  null,
  (dispatch) => ({
    onLoad: () => dispatch(getBookmarks()),
  }),
)(BookmarksPage);

const RouteContainer = (props) => (
  <Switch>
    <Route path="/bookmarks/add" component={BookmarksAddShortcut} />
    <Route path="/bookmarks" component={BookmarksPage} />
  </Switch>
);

export default RouteContainer;
