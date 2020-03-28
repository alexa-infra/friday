import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { showNew } from '../../features/bookmarks';


class BookmarksAddShortcut extends Component {
  componentDidMount() {
    const { location, showEditNew } = this.props;
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title');
    const url = searchParams.get('url');
    showEditNew({ title, url });
  }
  render() {
    return <Redirect to="/bookmarks" />
  }
}

BookmarksAddShortcut = connect(
  null,
  dispatch => ({
    showEditNew: val => dispatch(showNew(val)),
  })
)(BookmarksAddShortcut);

export default BookmarksAddShortcut;
