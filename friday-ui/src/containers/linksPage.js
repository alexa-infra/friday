import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinksPage } from '../components'
import { linksSelector } from '../selectors'
import { Actions } from '../constants'
import { getLinks, createAction } from '../actions'

class LinksPageContainer extends Component {
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    return <LinksPage {...this.props} />
  }
}

const mapDispatch = dispatch => {
  return {
    doSearch: term => dispatch(createAction(Actions.LINKS_FILTER, term)),
    onLoad: () => dispatch(getLinks()),
  }
}

export default connect(linksSelector, mapDispatch)(LinksPageContainer)
