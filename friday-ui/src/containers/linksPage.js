import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinksPage } from '../components'
import { getLinks } from '../actions'

class LinksPageContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getLinks())
  }
  render() {
    return <LinksPage />
  }
}

export default connect()(LinksPageContainer)