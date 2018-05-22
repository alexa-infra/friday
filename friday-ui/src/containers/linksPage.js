import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinksPage } from '../components'
import { linksSelector } from '../selectors'
import { Actions } from '../constants'
import { links, createAction } from '../actions'

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
    onLoad: () => dispatch(links.getLinks()),
    showEdit: item => dispatch(createAction(Actions.LINKS_SHOW_EDIT, item)),
    hideEdit: () => dispatch(createAction(Actions.LINKS_HIDE_EDIT)),
    showNew: () => dispatch(createAction(Actions.LINKS_SHOW_NEW)),
    enterEditMode: () => dispatch(createAction(Actions.LINKS_EDIT_MODE, true)),
    exitEditMode: () => dispatch(createAction(Actions.LINKS_EDIT_MODE, false)),
    create: item => dispatch(links.createLink(item)),
    update: item => dispatch(links.updateLink(item)),
    delete: item => dispatch(links.deleteLink(item)),
  }
}

export default connect(linksSelector, mapDispatch)(LinksPageContainer)
