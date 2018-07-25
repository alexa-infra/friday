import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { BookmarksPage } from '../components'
import { bookmarks, createAction } from '../actions'
import { Actions } from '../constants'


class BookmarksPageContainer extends Component {
  componentDidMount() {
    this.props.onLoad()
  }
  render() {
    return <BookmarksPage {...this.props} />
  }
}

const selector = state => {
  const { bookmarks } = state;
  const { page, pages } = bookmarks;
  return {
    ...bookmarks,
    hasNext: page < pages,
    hasPrev: page > 1,
  }
}

const mapDispatch = dispatch => {
  const reloadBookmarks = () => dispatch(bookmarks.getBookmarks());
  return {
    onLoad: reloadBookmarks,
    nextPage: () => dispatch(bookmarks.nextPage()).then(reloadBookmarks),
    prevPage: () => dispatch(bookmarks.prevPage()).then(reloadBookmarks),
    changePerPage: val => dispatch(bookmarks.perPage(val)).then(reloadBookmarks),
    doSearch: val => dispatch(bookmarks.filterBookmarks(val)).then(reloadBookmarks),
    resetSearch: val => dispatch(bookmarks.filterBookmarks(null)).then(reloadBookmarks),
    showEdit: item => dispatch(createAction(Actions.BOOKMARKS_SHOW_EDIT, item)),
    hideEdit: () => dispatch(createAction(Actions.BOOKMARKS_HIDE_EDIT)),
    showEditNew: () => dispatch(createAction(Actions.BOOKMARKS_SHOW_NEW)),
    showEditNew2: val => dispatch(createAction(Actions.BOOKMARKS_SHOW_NEW, val)),
    update: item => dispatch(bookmarks.updateBookmark(item)).then(reloadBookmarks),
    delete: item => dispatch(bookmarks.deleteBookmark(item)).then(reloadBookmarks),
    create: item => dispatch(bookmarks.createBookmark(item)).then(reloadBookmarks),
    markRead: item => dispatch(bookmarks.markReadBookmark(item)).then(reloadBookmarks),
  }
}

class BookmarksAddShortcut extends Component {
  componentDidMount() {
    const { location } = this.props;
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title');
    const url = searchParams.get('url');
    this.props.showEditNew2({title, url});
  }
  render() {
    return <Redirect to="/bookmarks" />
  }
}

BookmarksPageContainer = connect(selector, mapDispatch)(BookmarksPageContainer);
BookmarksAddShortcut = connect(selector, mapDispatch)(BookmarksAddShortcut);

const RouteContainer = props => (
  <Switch>
    <Route path="/bookmarks/add" component={BookmarksAddShortcut} />
    <Route path="/bookmarks" component={BookmarksPageContainer} />
  </Switch>
)

export default RouteContainer
