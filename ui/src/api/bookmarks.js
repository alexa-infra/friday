import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from './base';

const searchParams = ({ search, page, per_page }) => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  params.append('page', page);
  params.append('per_page', per_page);
  return params.toString();
};

const tagType = "bookmark";

export const bookmarkApi = createApi({
  baseQuery,
  reducerPath: "bookmark",
  tagTypes: [tagType],
  endpoints: (build) => ({
    getBookmarks: build.query({
      query: (params) => ({
        url: `/api/bookmarks?${searchParams(params)}`,
      }),
      providesTags: (result, error, params) => result ? [
        ...result.items.map(x => ({type: tagType, id: x.id})),
        {type: tagType, id: 'PARTIAL-LIST'},
      ] : [{type: tagType, id: 'PARTIAL-LIST'}],
    }),
    getBookmark: build.query({
      query: (id) => ({
        url: `/api/bookmarks/${id}`,
      }),
      providesTags: (result, error, id) => [{type: tagType, id}],
    }),
    createBookmark: build.mutation({
      query: ({ url, title, readed, favorite }) => ({
        url: '/api/bookmarks',
        method: 'POST',
        body: { url, title, readed, favorite },
      }),
      invalidatesTags: (result, error, data) => [{type: tagType, id: 'PARTIAL-LIST'}],
    }),
    updateBookmark: build.mutation({
      query: ({ id, url, title, readed, favorite }) => ({
        url: `/api/bookmarks/${id}`,
        method: 'PUT',
        body: { url, title, readed },
      }),
      invalidatesTags: (result, error, data) => [
        {type: tagType, id: data.id},
        {type: tagType, id: 'PARTIAL-LIST'},
      ],
    }),
    deleteBookmark: build.mutation({
      query: (data) => ({
        url: `/api/bookmarks/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, data) => [
        {type: tagType, id: data.id},
        {type: tagType, id: 'PARTIAL-LIST'},
      ],
    }),
    getFavoriteBookmarks: build.query({
      query: (params) => ({
        url: `/api/bookmarks/favorite?${searchParams(params)}`,
      }),
      providesTags: (result, error, params) => result ? [
        ...result.items.map(x => ({type: tagType, id: x.id})),
        {type: tagType, id: 'PARTIAL-LIST'},
      ] : [{type: tagType, id: 'PARTIAL-LIST'}],
    }),
  }),
});

export const {
  useGetBookmarksQuery,
  useCreateBookmarkMutation,
  useUpdateBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetFavoriteBookmarksQuery,
} = bookmarkApi;
