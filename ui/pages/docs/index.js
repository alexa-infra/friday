import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DocNew from './newDoc';
import DocEdit from './editDoc';
import DocView from './viewDoc';
import DocsList from './listDocs';

const DocsPage = () => (
  <Switch>
    <Route path="/docs/new" component={DocNew} />
    <Route path="/docs/:id/edit" component={DocEdit} />
    <Route path="/docs/:id" component={DocView} />
    <Route path="/docs" component={DocsList} />
  </Switch>
);

export default DocsPage;
