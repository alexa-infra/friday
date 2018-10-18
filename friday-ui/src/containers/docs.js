import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import { history } from '../store';
import { docs } from '../actions';
import { DocsList, DocNew, DocView, DocEdit } from '../components/docs';
import withOnLoad from '../components/withOnLoad';


let DocsListContainer = withOnLoad(DocsList, props => props.loadAll());
DocsListContainer = connect(
  state => state.docs,
  dispatch => ({
    loadAll: () => dispatch(docs.getDocs()),
  }),
)(DocsListContainer)


let DocViewContainer = withOnLoad(
  DocView,
  props => {
    const { match } = props;
    const data = { id: match.params.id };
    props.loadHtml(data);
  }
);
DocViewContainer = connect(
  state => state.docs.currentItem,
  dispatch => ({
    loadHtml: data => dispatch(docs.getDoc(data)).then(
      () => dispatch(docs.getDocHtml(data))
    ),
  })
)(DocViewContainer)


let DocEditContainer = withOnLoad(
  DocEdit,
  props => {
    const { match } = props;
    const data = { id: match.params.id };
    props.load(data);
  }
);
DocEditContainer = connect(
  state => state.docs.currentItem,
  dispatch => ({
    load: data => dispatch(docs.getDoc(data)).then(
      () => dispatch(docs.getDocText(data))
    ),
    update: data => dispatch(docs.updateDoc(data)).then(
      () => dispatch(docs.updateDocText(data))
    ).then(
      () => history.push(`/docs/${data.id}`)
    ),
    delete: data => dispatch(docs.deleteDoc(data)).then(
      () => history.push('/docs')
    ),
  })
)(DocEditContainer)


const DocNewContainer = connect(
  null,
  dispatch => ({
    create: data => dispatch(docs.createDoc(data)).then(
        ({ id }) => dispatch(docs.updateDocText({...data, id }))
      ).then(() => history.push('/docs')),
  })
)(DocNew)


const DocsPageContainer = () => (
  <Switch>
    <Route path="/docs/new" component={DocNewContainer} />
    <Route path="/docs/:id/edit" component={DocEditContainer} />
    <Route path="/docs/:id" component={DocViewContainer} />
    <Route path="/docs" component={DocsListContainer} />
  </Switch>
);

export default DocsPageContainer
