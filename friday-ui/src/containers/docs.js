import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import { push } from 'react-router-redux';
import { docs } from '../actions';
import { DocsList, DocNew, DocView, DocEdit, DocInfoEdit } from '../components/docs';


const mapDispatch = dispatch => ({
  loadAll: () => dispatch(docs.getDocs()),
  loadHtml: data => dispatch(docs.getDoc(data)).then(
    () => dispatch(docs.getDocHtml(data))
  ),
  loadText: data => dispatch(docs.getDoc(data)).then(
    () => dispatch(docs.getDocText(data))
  ),
  loadInfo: data => dispatch(docs.getDoc(data)),
  create: data => dispatch(docs.createDoc(data)).then(
    () => dispatch(push('/docs'))
  ),
  updateInfo: data => dispatch(docs.updateDoc(data)).then(
    () => dispatch(push(`/docs/${data.id}`))
  ),
  updateText: data => dispatch(docs.updateDocText(data)).then(
    () => dispatch(push(`/docs/${data.id}`))
  ),
  delete: data => dispatch(docs.deleteDoc(data)).then(
    () => dispatch(push('/docs'))
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
    this.props.loadText(data);
  }
  render() {
    return <DocEdit {...this.props} />
  }
}
DocEditContainer = connect(selectCurrentItem, mapDispatch)(DocEditContainer)


class DocInfoEditContainer extends Component {
  componentDidMount() {
    const { match } = this.props;
    const data = { id: match.params.id };
    this.props.loadInfo(data);
  }
  render() {
    return <DocInfoEdit {...this.props} />
  }
}
DocInfoEditContainer = connect(selectCurrentItem, mapDispatch)(DocInfoEditContainer)


const DocNewContainer = connect(() => ({}), mapDispatch)(DocNew)


class DocsPageContainer extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/docs/new" component={DocNewContainer} />
        <Route path="/docs/:id/info" component={DocInfoEditContainer} />
        <Route path="/docs/:id/edit" component={DocEditContainer} />
        <Route path="/docs/:id" component={DocViewContainer} />
        <Route path="/docs" component={DocsListContainer} />
      </Switch>
    )
  }
}

export default DocsPageContainer
