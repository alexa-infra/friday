import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import './root.css'
import { NavBar, Calendar } from '../components'
import LinksPageContainer from './linksPage'
import AlertsContainer from './alerts'

const Root = ({store, history}) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <content className="theme-l5">
        <header>
          <NavBar />
        </header>
        <main>
          <AlertsContainer />
          <Switch>
            <Route path="/events" component={Calendar} />
            <Route path="/" component={LinksPageContainer} />
          </Switch>
        </main>
      </content>
    </ConnectedRouter>
  </Provider>
)

export default Root
