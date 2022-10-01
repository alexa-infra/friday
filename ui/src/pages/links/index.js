import React from 'react';
import Search from './search';
import List from './list';
import { useGetFavoriteBookmarksQuery } from '../../api';


const searchField = (text) => text.replace(/\s+/g, ' ').toLowerCase();

const filterTerm = (term) => (item) => {
  if (!item.title) return false;
  return ~searchField(item.title).indexOf(term);
};

const LinksPage = () => {
  const { data, isLoading } = useGetFavoriteBookmarksQuery({ page: 0, per_page: 50 });
  const [filter, setFilter] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([]);
  React.useEffect(() => {
    if (data) {
      setFilteredData(data.items.filter(filterTerm(filter)));
    }
  }, [data, filter, setFilteredData]);
  return (
    <div className="links-page md:w-8/12 md:mx-auto">
      <Search filter={filter} setFilter={setFilter} />
      <List items={isLoading ? [] : filteredData} />
    </div>
  );
}

export default LinksPage;
