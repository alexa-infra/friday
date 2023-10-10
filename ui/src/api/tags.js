import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';

const tagType = 'tag';

export const docTagApi = createApi({
  baseQuery,
  reducerPath: 'doctag',
  tagTypes: [tagType],
  endpoints: (build) => ({
    getDocTagList: build.query({
      query: () => ({
        url: `/api/docs/tags`,
      }),
      providesTags: (result, error, data) =>
        result
          ? [
              ...result.map((x) => ({ type: tagType, id: x.id })),
              { type: tagType, id: 'LIST' },
            ]
          : [],
    }),
  }),
});

export const bookmarkTagApi = createApi({
  baseQuery,
  reducerPath: 'bookmarktag',
  tagTypes: [tagType],
  endpoints: (build) => ({
    getBookmarkTagList: build.query({
      query: () => ({
        url: `/api/bookmarks/tags`,
      }),
      providesTags: (result, error, data) =>
        result
          ? [
              ...result.map((x) => ({ type: tagType, id: x.id })),
              { type: tagType, id: 'LIST' },
            ]
          : [],
    }),
  }),
});

export const { useGetDocTagListQuery } = docTagApi;
export const { useGetBookmarkTagListQuery } = bookmarkTagApi;
