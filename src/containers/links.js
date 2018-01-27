import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Links } from '../components'
import { getLinks } from '../actions'

class LinksContainer extends Component {
  componentDidMount() {
  	this.props.dispatch(getLinks())
  }
  render() {
  	return <Links />
  }
}

export default connect()(LinksContainer)