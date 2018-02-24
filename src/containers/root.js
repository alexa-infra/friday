import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { NavBar, Calendar } from '../components'
import LinksPageContainer from './linksPage'

const Root = ({store, history}) => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <NavBar />
        <Route path="/" exact component={LinksPageContainer} />
        <Route path="/events" component={Calendar} />
      </div>
    </Router>
  </Provider>
)

export default Root
