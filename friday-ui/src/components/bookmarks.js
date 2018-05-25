import React, { Component } from 'react'
import classNames from 'classnames'
import './bookmarks.css'


const Bookmark = ({title, url, domain, created, readed}) => (
  <div className="bookmark">
    <div className="title">
      <a className={classNames({done: readed})} href={url}>{title}</a>
      <div className="site">
        (<a href={url}>{domain}</a>)
      </div>
    </div>
    <div className="controls">
      <i title={created.toISOString(true)}>{created.fromNow()}</i>
      <a>edit</a>
      <a>mark as read</a>
      <a>remove</a>
    </div>
  </div>
)

const BookmarksPage = props => (
  <div className="bookmarks-page">
    <SearchBox {...props} />
    <div className="bookmarks">
      {props.items.map(it => (
        <Bookmark key={it.id} {...it} />
      ))}
    </div>
    <Pagination {...props} />
  </div>
)

const Pagination = ({page, pages, hasPrev, hasNext, prevPage, nextPage, per_page, changePerPage}) => (
  <div className="pagination">
    <div className="buttons">
      <button type="button" onClick={prevPage}
              disabled={!hasPrev}>
        <i className="fa fa-chevron-left" />
      </button>
      <button type="button" disabled={true}>
        {page} / {pages}
      </button>
      <button type="button" onClick={nextPage}
              disabled={!hasNext}>
        <i className="fa fa-chevron-right" />
      </button>
    </div>
    <div>
      Per page {' '}
      <select value={per_page}
              onChange={e => changePerPage(e.target.value)}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  </div>
)

class SearchBox extends Component {
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
    return (
      <div className="search-box">
        <input className="search"
               type="text"
               placeholder="Search..."
               value={this.state.search || ''}
               onChange={this.handleChangeSearch} />
        <button type="button"
                onClick={() => this.props.doSearch(this.state.search)}>
          Search
        </button>
        <button type="button"
                onClick={() => this.props.resetSearch()}>
          Reset
        </button>
      </div>
    )
  }
}

export default BookmarksPage
