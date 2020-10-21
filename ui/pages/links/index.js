import React from 'react';
import { connect } from 'react-redux';
import Controls from './controls';
import List from './list';
import EditModal from './editForm';
import NewModal from './newForm';
import { getLinks } from '../../features/links';
import { withOnLoad } from '../../components';

let LinksPage = () => (
  <div className="links-page">
    <Controls />
    <List />
    <NewModal />
    <EditModal />
  </div>
);

LinksPage = withOnLoad(LinksPage, (props) => props.onLoad());

LinksPage = connect(
  null,
  (dispatch) => ({
    onLoad: () => dispatch(getLinks()),
  }),
)(LinksPage);

export default LinksPage;