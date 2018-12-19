import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router'
import './root.scss'

import Docs from '../docs';
import Login from '../login';
import Events from '../events';
import Links from '../links';
import Bookmarks from '../bookmarks';
import Recipes from '../kueche';

import { NavBar, Alerts } from '../../components'


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
            <Route path="/login" component={Login} />
            <Route path="/events" component={Events} />
            <Route path="/bookmarks" component={Bookmarks} />
            <Route path="/docs" component={Docs} />
            <Route path="/recipes" component={Recipes} />
            <Route path="/" component={Links} />
          </Switch>
        </main>
      </content>
    </Router>
  </Provider>
);

export default Root;
