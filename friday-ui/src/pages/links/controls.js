import React from 'react';
import { connect } from 'react-redux';
import { links } from '../../actions';
import SearchBox from './search';


let EditModeButton = ({editMode, toggleEditMode}) => (
  <button type="button" onClick={toggleEditMode}>
    Edit: {editMode ? 'on' : 'off'}
  </button>
);

EditModeButton = connect(
  state => ({
    editMode: state.links.editMode,
  }),
  dispatch => ({
    toggleEditMode: () => dispatch(links.toggleEditMode()),
  })
)(EditModeButton);

let NewLinkButton = ({showNew}) => (
  <button type="button" onClick={showNew}>
    New
  </button>
);

NewLinkButton = connect(
  null,
  dispatch => ({
    showNew: () => dispatch(links.showNew()),
  })
)(NewLinkButton);

const Controls = () => (
  <React.Fragment>
    <SearchBox />
    <NewLinkButton />
    <EditModeButton />
  </React.Fragment>
);

export default Controls;
