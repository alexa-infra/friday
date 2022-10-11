import React from 'react';


export const SearchBox = ({ setFilter, filter }) => (
  <div className="flex flex-row">
    <div className="flex-grow">
      <input
        className="search w-full"
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  </div>
);
