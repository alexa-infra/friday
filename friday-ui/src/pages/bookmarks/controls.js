import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bookmarks } from '../../actions';


class Controls extends Component {
  state = {
    search: null,
  }
  handleChangeSearch = event => {
    this.setState({search: event.target.value})
  }
  onResetSearch = event => {
    const { doSearch } = this.props;
    this.setState({search: null});
    doSearch(null);
  }
  render() {
    const { search } = this.state;
    const { doSearch, showEditNew } = this.props;
    return (
      <div className="row justify-content-center">
        <div className="col col-sm-8 col-md-6">
          <input className="search w-100"
                 type="text"
                 placeholder="Search..."
                 value={search || ''}
                 onChange={this.handleChangeSearch} />
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
    )
  }
}

Controls = connect(
  state => ({
    search: state.bookmarks.search,
  }),
  dispatch => {
    const reloadBookmarks = () => dispatch(bookmarks.getBookmarks());
    return {
      doSearch: val => dispatch(bookmarks.filterBookmarks(val)).then(reloadBookmarks),
      showEditNew: () => dispatch(bookmarks.showNew()),
    };
  }
)(Controls);

export default Controls;
