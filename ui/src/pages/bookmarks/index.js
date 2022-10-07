import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import BookmarksAddShortcut from './newShortcut';
import Controls from './controls';
import List from './list';
import { Pagination } from '../../components';
import BrowserBookmark from './browserBookmark';
import EditForm from './editForm';
import NewForm from './newForm';
import { useGetBookmarksQuery } from '../../api';


const BookmarksPage = () => {
  const location = useLocation();
  const { newItem: initNewItem } = location.state || { newItem: null };

  const [params, setParams] = React.useState({
    search: null,
    page: 1,
    pages: 0,
    per_page: 10,
  });
  const setFilter = search =>
    setParams(x => ({
      ...x,
      search,
    }));
  const nextPage = () =>
    setParams(x => ({
      ...x,
      page: x.page < x.pages ? x.page + 1 : x.page,
    }));
  const prevPage = () =>
    setParams(x => ({
      ...x,
      page: x.page > 0 ? x.page - 1 : x.page,
    }));
  const changePerPage = per_page =>
    setParams(x => ({
      ...x,
      per_page,
    }));

  const { data, isLoading } = useGetBookmarksQuery({
    search: params.search,
    page: params.page,
    per_page: params.per_page,
  });
  React.useEffect(() => {
    if (data) {
      const { page, pages, per_page } = data;
      setParams(x => ({
        ...x,
        page,
        pages,
        per_page,
      }));
    }
  }, [data, setParams]);

  const [editItem, setEditItem] = React.useState(null);
  const [newItem, setNewItem] = React.useState(initNewItem);

  return (
    <div className="bookmarks-page md:w-8/12 md:mx-auto">
      <Controls
        {...params}
        doSearch={setFilter}
        showEditNew={() => setNewItem({})}
      />
      <List
        items={isLoading ? [] : data.items}
        showEdit={setEditItem}
      />
      <Pagination
        {...params}
        nextPage={nextPage}
        prevPage={prevPage}
        changePerPage={changePerPage}
      />
      <BrowserBookmark />
      <EditForm
        show={editItem !== null}
        hideEdit={() => setEditItem(null)}
        item={editItem}
      />
      <NewForm
        show={newItem !== null}
        hideEdit={() => setNewItem(null)}
        item={newItem}
      />
    </div>
  );
}

const RouteContainer = () => (
  <Routes>
    <Route path="add" element={
      <BookmarksAddShortcut />
    } />
    <Route path="" element={
      <BookmarksPage />
    } />
  </Routes>
);

export default RouteContainer;
