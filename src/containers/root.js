import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { NavBar } from '../components'
import LinksPageContainer from './linksPage'

const Root = ({store, history}) => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <NavBar />
        <Route path="/" component={LinksPageContainer} />
      </div>
    </Router>
  </Provider>
)

export default Root
