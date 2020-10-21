import React from 'react';
import { connect } from 'react-redux';
// import { links } from '../../actions';
import classNames from 'classnames';
import SearchBox from './search';
import { toggleEditMode, showNew } from '../../features/links';


let EditModeButton = ({ editMode, toggleEditMode }) => (
  <button type="button" className={classNames('btn', { 'btn-primary': editMode, 'btn-secondary': !editMode })} onClick={toggleEditMode}>
    <i className="fa fa-edit" />
  </button>
);

EditModeButton = connect(
  (state) => ({
    editMode: state.links.items.editMode,
  }),
  (dispatch) => ({
    toggleEditMode: () => dispatch(toggleEditMode()),
  }),
)(EditModeButton);

let NewLinkButton = ({ showNew }) => (
  <button type="button" className="btn btn-secondary" onClick={showNew}>
    <i className="fa fa-plus" />
  </button>
);

NewLinkButton = connect(
  null,
  (dispatch) => ({
    showNew: () => dispatch(showNew()),
  }),
)(NewLinkButton);

const Controls = () => (
  <div className="row my-1 justify-content-center">
    <div className="col-8 col-sm-10 col-md-6">
      <SearchBox />
    </div>
    <div className="col-4 col-sm-2 text-left">
      <div className="btn-group">
        <NewLinkButton />
        <EditModeButton />
      </div>
    </div>
  </div>
);

export default Controls;
