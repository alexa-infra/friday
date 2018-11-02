import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bookmarks } from '../../actions';


class Controls extends Component {
  state = {
    search: null,
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.search !== prevState.search)
      return {
        search: nextProps.search,
      }
    return null;
  }
  handleChangeSearch = event => {
    this.setState({search: event.target.value})
  }
  render() {
    const { search } = this.state;
    const { doSearch, resetSearch, showEditNew } = this.props;
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
        <button type="button" onClick={resetSearch}>
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
      resetSearch: val => dispatch(bookmarks.filterBookmarks(null)).then(reloadBookmarks),
      showEditNew: () => dispatch(bookmarks.showNew()),
    };
  }
)(Controls);

export default Controls;
