import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterItems } from '../../features/links';


class SearchBox extends Component {
  doSearch = event => {
    const { doSearch } = this.props;
    const query = this.searchInput.value;
    doSearch(query);
  }
  render() {
    const { filter } = this.props;
    return (
      <input className="search w-100"
             type="text"
             placeholder="Search..."
             ref={ input => { this.searchInput = input; }}
             value={filter}
             onChange={this.doSearch} />
    )
  }
}

SearchBox = connect(
  state => ({
    filter: state.links.filter,
  }),
  dispatch => ({
    doSearch: text => dispatch(filterItems(text)),
  })
)(SearchBox);

export default SearchBox;
