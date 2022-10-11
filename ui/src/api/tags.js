import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';

const tagType = 'tag';

export const tagApi = createApi({
  baseQuery,
  reducerPath: 'tag',
  tagTypes: [tagType],
  endpoints: (build) => ({
    getTagList: build.query({
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

export const { useGetTagListQuery } = tagApi;
