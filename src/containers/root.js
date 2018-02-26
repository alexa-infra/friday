import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import './root.css'
import { NavBar, Calendar } from '../components'
import LinksPageContainer from './linksPage'

const Root = ({store, history}) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <content>
        <header>
          <NavBar />
        </header>
        <main>
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
