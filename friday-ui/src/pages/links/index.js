import React from 'react';
import Controls from './controls';
import List from './list';
import EditModal from './editForm';
import NewModal from './newForm';
import { connect } from 'react-redux';
import { links } from '../../actions';
import { withOnLoad } from '../../components';
import './style.css';


let LinksPage = () => (
  <div className="links-page">
    <Controls />
    <List />
    <NewModal />
    <EditModal />
  </div>
);

LinksPage = withOnLoad(LinksPage, props => props.onLoad());

LinksPage = connect(
  null,
  dispatch => ({
    onLoad: () => dispatch(links.getLinks()),
  })
)(LinksPage);

export default LinksPage;
