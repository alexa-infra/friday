import React, { Component } from 'react'
import './linksPage.css'


const Link = ({ id, url, title }) => (
  <a href={`/api/links/${id}/redirect`} title={url}>{title}</a>
)

const LinkList = ({ links, filter, doSearch }) => (
  <div className="links-page">
    <SearchBox filter={filter} doSearch={doSearch} />
    <ul className="link-list">
      {links.map(it => (
        <li key={it.id}>
          <Link {...it} />
        </li>
      ))}
    </ul>
  </div>
)

class SearchBox extends Component {
  doSearch = event => {
    const query = this.searchInput.value;
    this.props.doSearch(query);
  }
  render() {
    return (
      <input className="search"
             type="text"
             placeholder="Search..."
             ref={ input => { this.searchInput = input; }}
             value={this.props.filter}
             onChange={this.doSearch} />
    )
  }
}

export default LinkList
