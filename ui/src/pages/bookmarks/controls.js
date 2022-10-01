import React from 'react';
import Button from '../../components/button';


const Controls = ({ search: initSearch, doSearch, showEditNew }) => {
  const [search, setSearch] = React.useState(initSearch);
  React.useEffect(() => {
    setSearch(initSearch);
  }, [initSearch]);
  const onResetSearch = () => doSearch(null);
  const handleChangeSearch = (event) => setSearch(event.target.value);
  return (
    <div className="flex flex-row items-center my-2">
      <input
        className="search flex-grow"
        type="text"
        placeholder="Search..."
        value={search || ''}
        onChange={handleChangeSearch}
        onKeyPress={(e) => (e.key === 'Enter' ? doSearch(search) : null)}
      />
      <div className="btn-group">
        <Button onClick={() => doSearch(search)}>
          <i className="fa fa-search" />
        </Button>
        <Button onClick={onResetSearch}>
          <i className="fa fa-undo" />
        </Button>
        <Button onClick={showEditNew}>
          <i className="fa fa-plus" />
        </Button>
      </div>
    </div>
  );
}

export default Controls;
