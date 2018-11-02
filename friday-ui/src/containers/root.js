import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router'
import './root.css'
import { NavBar, Alerts } from '../components'
import * as Pages from '../pages';

const Root = ({store, history}) => (
  <Provider store={store}>
    <Router history={history}>
      <content className="theme-l5">
        <header>
          <NavBar />
        </header>
        <main>
          <Alerts />
          <Switch>
            <Route path="/login" component={Pages.Login} />
            <Route path="/events" component={Pages.Events} />
            <Route path="/bookmarks" component={Pages.Bookmarks} />
            <Route path="/docs" component={Pages.Docs} />
            <Route path="/" component={Pages.Links} />
          </Switch>
        </main>
      </content>
    </Router>
  </Provider>
)

export default Root
