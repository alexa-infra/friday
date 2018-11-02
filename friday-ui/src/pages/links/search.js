import React, { Component } from 'react';
import { connect } from 'react-redux';
import { links } from '../../actions';


class SearchBox extends Component {
  doSearch = event => {
    const { doSearch } = this.props;
    const query = this.searchInput.value;
    doSearch(query);
  }
  render() {
    const { filter } = this.props;
    return (
      <input className="search"
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
    doSearch: text => dispatch(links.filterItems(text)),
  })
)(SearchBox);

export default SearchBox;
