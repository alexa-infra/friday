import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showNew, setFilter, selectPagination } from '../../features/bookmarks';

class Controls extends Component {
  state = {
    search: null,
  }

  handleChangeSearch = (event) => {
    this.setState({ search: event.target.value });
  }

  onResetSearch = () => {
    const { doSearch } = this.props;
    this.setState({ search: null });
    doSearch(null);
  }

  render() {
    const { search } = this.state;
    const { doSearch, showEditNew } = this.props;
    return (
      <div className="row justify-content-center">
        <div className="col col-sm-8 col-md-6">
          <input
            className="search w-100"
            type="text"
            placeholder="Search..."
            value={search || ''}
            onChange={this.handleChangeSearch}
            onKeyPress={(e) => (e.key === 'Enter' ? doSearch(search) : null)}
          />
        </div>
        <div className="col col-sm-4 col-md-2">
          <div className="btn-group">
            <button type="button" className="btn btn-secondary" onClick={() => doSearch(search)}>
              <i className="fa fa-search" />
            </button>
            <button type="button" className="btn btn-secondary" onClick={this.onResetSearch}>
              <i className="fa fa-undo" />
            </button>
            <button type="button" className="btn btn-secondary" onClick={showEditNew}>
              <i className="fa fa-plus" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const ControlsContainer = connect(
  selectPagination,
  (dispatch) => ({
    doSearch: (val) => dispatch(setFilter(val)),
    showEditNew: () => dispatch(showNew()),
  }),
)(Controls);

export default ControlsContainer;
