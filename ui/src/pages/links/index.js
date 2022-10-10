import React from 'react';
import { SearchBox } from './search';
import { LinkList } from './list';
import { useGetFavoriteBookmarksQuery } from '../../api';


const searchField = (text) => text.replace(/\s+/g, ' ').toLowerCase();

const filterTerm = (term) => (item) => {
  if (!item.title) return false;
  return ~searchField(item.title).indexOf(term);
};

export const LinksPage = () => {
  const { data, isLoading } = useGetFavoriteBookmarksQuery({ page: 0, per_page: 100 });
  const [filter, setFilter] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([]);
  React.useEffect(() => {
    if (data) {
      setFilteredData(data.items.filter(filterTerm(filter)));
    }
  }, [data, filter, setFilteredData]);
  return (
    <div className="links-page md:w-8/12 md:mx-auto">
      <SearchBox filter={filter} setFilter={setFilter} />
      <LinkList items={isLoading ? [] : filteredData} />
    </div>
  );
}
