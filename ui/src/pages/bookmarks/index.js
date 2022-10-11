import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { BookmarksAddShortcut } from './newShortcut';
import { Controls } from './controls';
import { BookmarkList } from './list';
import { Pagination } from '../../components';
import { BrowserBookmark } from './browserBookmark';
import { BookmarkEditForm } from './editForm';
import { BookmarkNewForm } from './newForm';
import { useGetBookmarksQuery } from '../../api';

const useNewItem = () => {
  const location = useLocation();
  const { newItem: initNewItem } = location.state || { newItem: null };
  const [newItem, setNewItem] = React.useState(initNewItem);
  return [newItem, setNewItem];
}

const usePagination = () => {
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
  const methods = {
    setFilter,
    nextPage,
    prevPage,
    changePerPage,
  };
  return [params, setParams, methods];
}

const useQuery = () => {
  const [params, setParams, methods] = usePagination();
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
  return [isLoading ? [] : data.items, params, methods];
}

const Bookmarks = () => {
  const [data, params, methods] = useQuery();
  const [editItem, setEditItem] = React.useState(null);
  const [newItem, setNewItem] = useNewItem();
  return (
    <div className="bookmarks-page md:w-8/12 md:mx-auto">
      <Controls
        {...params}
        doSearch={methods.setFilter}
        showEditNew={() => setNewItem({})}
      />
      <BookmarkList
        items={data}
        showEdit={setEditItem}
      />
      <Pagination
        {...params}
        {...methods}
      />
      <BrowserBookmark />
      <BookmarkEditForm
        show={editItem !== null}
        hideEdit={() => setEditItem(null)}
        item={editItem}
      />
      <BookmarkNewForm
        show={newItem !== null}
        hideEdit={() => setNewItem(null)}
        item={newItem}
      />
    </div>
  );
}

export const BookmarksPage = () => (
  <Routes>
    <Route path="add" element={
      <BookmarksAddShortcut />
    } />
    <Route path="" element={
      <Bookmarks />
    } />
  </Routes>
);
