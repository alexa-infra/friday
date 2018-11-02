import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import BookmarksAddShortcut from './newShortcut';
import Controls from './controls';
import List from './list';
import Pagination from './pagination';
import BrowserBookmark from './browserBookmark';
import EditForm from './editForm';
import NewForm from './newForm';
import { bookmarks } from '../../actions';
import './style.css';


class BookmarksPage extends Component {
  componentDidMount() {
    this.props.onLoad()
  }
  render() {
    return (
      <div className="bookmarks-page">
        <Controls />
        <List />
        <Pagination />
        <BrowserBookmark />
        <EditForm />
        <NewForm />
      </div>
    );
  }
}

BookmarksPage = connect(
  null,
  dispatch => ({
    onLoad: () => dispatch(bookmarks.getBookmarks()),
  })
)(BookmarksPage);

const RouteContainer = props => (
  <Switch>
    <Route path="/bookmarks/add" component={BookmarksAddShortcut} />
    <Route path="/bookmarks" component={BookmarksPage} />
  </Switch>
);

export default RouteContainer
