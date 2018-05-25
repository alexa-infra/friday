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

const selector = state => state.bookmarks

const mapDispatch = dispatch => {
  return {
    onLoad: () => dispatch(bookmarks.getBookmarks()),
  }
}

export default connect(selector, mapDispatch)(BookmarksPageContainer)
