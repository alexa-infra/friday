import React from 'react';
import SearchBox from './search';

const Controls = () => (
  <div className="flex flex-row">
    <div className="flex-grow">
      <SearchBox />
    </div>
  </div>
);

export default Controls;
