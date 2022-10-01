import { wrap } from './utils';
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from './base';

const formatData = (data) => {
  const { url, title, readed } = data;
  return { url, title, readed };
};

const searchParams = ({ search, page, per_page }) => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  params.append('page', page);
  params.append('per_page', per_page);
  return params.toString();
};

export const getBookmarks = wrap((data) => ({
  url: `/api/bookmarks?${searchParams(data)}`,
  method: 'GET',
}));

export const createBookmark = wrap((data) => ({
  url: '/api/bookmarks',
  method: 'POST',
  body: formatData(data),
}));

export const updateBookmark = wrap((data) => ({
  url: `/api/bookmarks/${data.id}`,
  method: 'PUT',
  body: formatData(data),
}));

export const deleteBookmark = wrap((data) => ({
  url: `/api/bookmarks/${data.id}`,
  method: 'DELETE',
  body: formatData(data),
}));

export const bookmarkApi = createApi({
  baseQuery,
  reducerPath: "bookmark",
  tagTypes: ["bookmark"],
  endpoints: (build) => ({
    getBookmarks: build.query({
      query: (params) => ({
        url: `/api/bookmarks?${searchParams(params)}`,
      }),
      providesTags: (result, error, params) => result ? [
        ...result.items.map(x => ({type: 'bookmark', id: x.id})),
        {type: 'bookmark', id: 'PARTIAL-LIST'},
      ] : [{type: 'bookmark', id: 'PARTIAL-LIST'}],
    }),
    getBookmark: build.query({
      query: (id) => ({
        url: `/api/bookmarks/${id}`,
      }),
      providesTags: (result, error, id) => [{type: 'bookmark', id}],
    }),
    createBookmark: build.mutation({
      query: (data) => ({
        url: '/api/bookmarks',
        method: 'POST',
        body: formatData(data),
      }),
      invalidatesTags: (result, error, data) => [{type: 'bookmark', id: 'PARTIAL-LIST'}],
    }),
    updateBookmark: build.mutation({
      query: (data) => ({
        url: `/api/bookmarks/${data.id}`,
        method: 'PUT',
        body: formatData(data),
      }),
      invalidatesTags: (result, error, data) => [
        {type: 'bookmark', id: data.id},
        {type: 'bookmark', id: 'PARTIAL-LIST'},
      ],
    }),
    deleteBookmark: build.mutation({
      query: (data) => ({
        url: `/api/bookmarks/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, data) => [
        {type: 'bookmark', id: data.id},
        {type: 'bookmark', id: 'PARTIAL-LIST'},
      ],
    }),
  }),
});

export const {
  useGetBookmarksQuery,
  useCreateBookmarkMutation,
  useUpdateBookmarkMutation,
  useDeleteBookmarkMutation,
} = bookmarkApi;
