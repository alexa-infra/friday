import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';

const recipeTagType = 'recipe';

export const recipeApi = createApi({
  baseQuery,
  reducerPath: 'recipe',
  tagTypes: [recipeTagType],
  endpoints: (build) => ({
    getRecipeList: build.query({
      query: () => ({
        url: `/api/recipes`,
      }),
      providesTags: (result, error, data) =>
        result
          ? [
              ...result.map((x) => ({
                type: recipeTagType,
                id: x.id,
              })),
              { type: recipeTagType, id: 'LIST' },
            ]
          : [],
    }),
  }),
});

export const { useGetRecipeListQuery } = recipeApi;
