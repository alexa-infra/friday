import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { NavBar, Calendar } from '../components'
import LinksPageContainer from './linksPage'

const Root = ({store, history}) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <NavBar />
        <Switch>
          <Route path="/events" component={Calendar} />
          <Route path="/" component={LinksPageContainer} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
)

export default Root
