import React from 'react';


const Pagination = ({
  page, pages, per_page, prevPage, nextPage, changePerPage,
}) => {
  const hasNext = page < pages;
  const hasPrev = page > 1;
  return (
    <div className="pagination justify-content-center">
      <div className="buttons">
        <button
          type="button"
          onClick={prevPage}
          disabled={!hasPrev}
        >
          <i className="fa fa-chevron-left" />
        </button>
        <button type="button" disabled>
          {page}
          {' '}
          /
          {pages}
        </button>
        <button
          type="button"
          onClick={nextPage}
          disabled={!hasNext}
        >
          <i className="fa fa-chevron-right" />
        </button>
      </div>
      <div>
        Per page
        {' '}
        {' '}
        <select
          value={per_page}
          onChange={(e) => changePerPage(e.target.value)}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
