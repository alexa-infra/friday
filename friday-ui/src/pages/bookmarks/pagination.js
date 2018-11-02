import React from 'react';
import { connect } from 'react-redux';
import { bookmarks } from '../../actions';


let Pagination = ({page, pages, per_page, prevPage, nextPage, changePerPage}) => {
  const hasNext = page < pages;
  const hasPrev = page > 1;
  return (
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
  );
}

Pagination = connect(
  state => state.bookmarks,
  dispatch => {
    const reloadBookmarks = () => dispatch(bookmarks.getBookmarks());
    return {
      nextPage: () => dispatch(bookmarks.nextPage()).then(reloadBookmarks),
      prevPage: () => dispatch(bookmarks.prevPage()).then(reloadBookmarks),
      changePerPage: val => dispatch(bookmarks.perPage(val)).then(reloadBookmarks),
    };
  },
)(Pagination);

export default Pagination;
