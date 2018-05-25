import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BookmarksPage } from '../components'
import { bookmarks } from '../actions'


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
  return {
    onLoad: () => dispatch(bookmarks.getBookmarks()),
    nextPage: () => dispatch(bookmarks.nextPage()),
    prevPage: () => dispatch(bookmarks.prevPage()),
    changePerPage: val => dispatch(bookmarks.perPage(val)),
    doSearch: val => dispatch(bookmarks.filterBookmarks(val)),
    resetSearch: val => dispatch(bookmarks.filterBookmarks(null)),
  }
}

export default connect(selector, mapDispatch)(BookmarksPageContainer)
