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
      <div className="search-box">
        <input className="search"
               type="text"
               placeholder="Search..."
               value={search || ''}
               onChange={this.handleChangeSearch} />
        <button type="button" onClick={() => doSearch(search)}>
          Search
        </button>
        <button type="button" onClick={this.onResetSearch}>
          Reset
        </button>
        <button type="button" onClick={showEditNew}>
          New
        </button>
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
