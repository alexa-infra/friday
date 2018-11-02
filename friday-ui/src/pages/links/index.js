import React from 'react';
import Controls from './controls';
import List from './list';
import EditModal from './editForm';
import NewModal from './newForm';
import { connect } from 'react-redux';
import { links } from '../../actions';
import './style.css';


class LinksPage extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    return (
      <div className="links-page">
        <Controls />
        <List />
        <NewModal />
        <EditModal />
      </div>
    );
  }
};

LinksPage = connect(
  null,
  dispatch => ({
    onLoad: () => dispatch(links.getLinks()),
  })
)(LinksPage);

export default LinksPage;
