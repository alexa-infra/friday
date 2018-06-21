import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import { push } from 'react-router-redux';
import { docs } from '../actions';
import { DocsList, DocNew, DocView, DocEdit, DocInfoEdit } from '../components/docs';


class DocsListContainer extends Component {
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    return <DocsList {...this.props} />
  }
}
DocsListContainer = connect(
  state => state.docs,
  dispatch => ({
    onLoad: () => dispatch(docs.getDocs()),
  })
)(DocsListContainer)


class DocViewContainer extends Component {
  componentDidMount() {
    const { match } = this.props;
    const data = { id: match.params.id };
    this.props.onLoad(data);
  }
  render() {
    return <DocView {...this.props} />
  }
}
DocViewContainer = connect(state => {
  const { currentItem } = state.docs;
  return currentItem || {};
}, dispatch => ({
  onLoad: data => dispatch(docs.getDoc(data)).then(
    () => dispatch(docs.getDocHtml(data))
  ),
}))(DocViewContainer)


class DocEditContainer extends Component {
  componentDidMount() {
    const { match } = this.props;
    const data = { id: match.params.id };
    this.props.onLoad(data);
  }
  render() {
    return <DocEdit {...this.props} />
  }
}
DocEditContainer = connect(state => {
  const { currentItem } = state.docs;
  return currentItem || {};
}, dispatch => ({
  onLoad: data => dispatch(docs.getDoc(data)).then(
    () => dispatch(docs.getDocText(data))
  ),
  save: data => dispatch(docs.updateDocText(data)).then(
    () => dispatch(push(`/docs/${data.id}`))
  ),
}))(DocEditContainer)


class DocInfoEditContainer extends Component {
  componentDidMount() {
    const { match } = this.props;
    const data = { id: match.params.id };
    this.props.onLoad(data);
  }
  render() {
    return <DocInfoEdit {...this.props} />
  }
}
DocInfoEditContainer = connect(state => {
  const { currentItem } = state.docs;
  return currentItem || {};
}, dispatch => ({
  onLoad: data => dispatch(docs.getDoc(data)),
  save: data => dispatch(docs.updateDoc(data)).then(
    () => dispatch(push(`/docs/${data.id}`))
  ),
  delete: data => dispatch(docs.deleteDoc(data)).then(
    () => dispatch(push('/docs'))
  ),
}))(DocInfoEditContainer)


const DocNewContainer = connect(() => ({}), dispatch => ({
  create: data => dispatch(docs.createDoc(data)).then(
    () => dispatch(push('/docs'))
  ),
}))(DocNew)


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
