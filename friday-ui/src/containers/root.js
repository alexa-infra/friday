import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router'
import './root.css'
import { NavBar } from '../components'
import LinksPageContainer from './linksPage'
import AlertsContainer from './alerts'
import BookmarksPageContainer from './bookmarks.js'
import { Docs as DocsPageContainer, Login as LoginPageContainer,
         Events as EventsPageContainer } from '../pages';

const Root = ({store, history}) => (
  <Provider store={store}>
    <Router history={history}>
      <content className="theme-l5">
        <header>
          <NavBar />
        </header>
        <main>
          <AlertsContainer />
          <Switch>
            <Route path="/login" component={LoginPageContainer} />
            <Route path="/events" component={EventsPageContainer} />
            <Route path="/bookmarks" component={BookmarksPageContainer} />
            <Route path="/docs" component={DocsPageContainer} />
            <Route path="/" component={LinksPageContainer} />
          </Switch>
        </main>
      </content>
    </Router>
  </Provider>
)

export default Root
