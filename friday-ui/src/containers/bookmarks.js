import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    update: item => dispatch(bookmarks.updateBookmark(item)).then(reloadBookmarks),
    delete: item => dispatch(bookmarks.deleteBookmark(item)).then(reloadBookmarks),
    create: item => dispatch(bookmarks.createBookmark(item)).then(reloadBookmarks),
    markRead: item => dispatch(bookmarks.markReadBookmark(item)).then(reloadBookmarks),
  }
}

export default connect(selector, mapDispatch)(BookmarksPageContainer)
