import React from 'react';
import { connect } from 'react-redux';
// import { links } from '../../actions';
import SearchBox from './search';
import { toggleEditMode, showNew } from '../../features/links';
import Button from '../../components/button';

let EditModeButton = ({ editMode, toggleEditMode }) => (
  <Button
    isActive={editMode}
    onClick={toggleEditMode}
  >
    <i className="fa fa-edit" />
  </Button>
);

EditModeButton = connect(
  (state) => ({
    editMode: state.links.editMode,
  }),
  (dispatch) => ({
    toggleEditMode: () => dispatch(toggleEditMode()),
  }),
)(EditModeButton);

let NewLinkButton = ({ showNew }) => (
  <Button onClick={showNew}>
    <i className="fa fa-plus" />
  </Button>
);

NewLinkButton = connect(
  null,
  (dispatch) => ({
    showNew: () => dispatch(showNew({})),
  }),
)(NewLinkButton);

const Controls = () => (
  <div className="flex flex-row">
    <div className="flex-grow">
      <SearchBox />
    </div>
    <NewLinkButton />
    <EditModeButton />
  </div>
);

export default Controls;
