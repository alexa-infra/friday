import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import { history } from '../store';
import { docs } from '../actions';
import { DocsList, DocNew, DocView, DocEdit } from '../components/docs';


const mapDispatch = dispatch => ({
  loadAll: () => dispatch(docs.getDocs()),
  loadHtml: data => dispatch(docs.getDoc(data)).then(
    () => dispatch(docs.getDocHtml(data))
  ),
  load: data => dispatch(docs.getDoc(data)).then(
    () => dispatch(docs.getDocText(data))
  ),
  create: data => dispatch(docs.createDoc(data)).then(
    ({ id }) => dispatch(docs.updateDocText({...data, id }))
  ).then(
    () => history.push('/docs')
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

const selectCurrentItem = state => {
  const { currentItem } = state.docs;
  return currentItem || {};
}

class DocsListContainer extends Component {
  componentDidMount() {
    this.props.loadAll();
  }
  render() {
    return <DocsList {...this.props} />
  }
}
DocsListContainer = connect(state => state.docs, mapDispatch)(DocsListContainer)


class DocViewContainer extends Component {
  componentDidMount() {
    const { match } = this.props;
    const data = { id: match.params.id };
    this.props.loadHtml(data);
  }
  render() {
    return <DocView {...this.props} />
  }
}
DocViewContainer = connect(selectCurrentItem, mapDispatch)(DocViewContainer)


class DocEditContainer extends Component {
  componentDidMount() {
    const { match } = this.props;
    const data = { id: match.params.id };
    this.props.load(data);
  }
  render() {
    return <DocEdit {...this.props} />
  }
}
DocEditContainer = connect(selectCurrentItem, mapDispatch)(DocEditContainer)


const DocNewContainer = connect(() => ({}), mapDispatch)(DocNew)


class DocsPageContainer extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/docs/new" component={DocNewContainer} />
        <Route path="/docs/:id/edit" component={DocEditContainer} />
        <Route path="/docs/:id" component={DocViewContainer} />
        <Route path="/docs" component={DocsListContainer} />
      </Switch>
    )
  }
}

export default DocsPageContainer
