import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showNew, setFilter, selectPagination } from '../../features/bookmarks';
import Button from '../../components/button';


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
      <div className="flex flex-row items-center my-2">
        <input
          className="search flex-grow"
          type="text"
          placeholder="Search..."
          value={search || ''}
          onChange={this.handleChangeSearch}
          onKeyPress={(e) => (e.key === 'Enter' ? doSearch(search) : null)}
        />
        <div className="btn-group">
          <Button onClick={() => doSearch(search)}>
            <i className="fa fa-search" />
          </Button>
          <Button onClick={this.onResetSearch}>
            <i className="fa fa-undo" />
          </Button>
          <Button onClick={showEditNew}>
            <i className="fa fa-plus" />
          </Button>
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
