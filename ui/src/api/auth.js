import { wrap } from './utils';
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from './base';

export const login = wrap(({ email, password }) => ({
  url: '/api/users/login',
  method: 'POST',
  body: { email, password },
}));

export const currentUser = wrap(() => ({
  url: '/api/users/current',
  method: 'GET',
}));

export const authApi = createApi({
  baseQuery,
  reducerPath: "auth",
  tagTypes: ["auth"],
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ email, password }) => ({
        url: '/api/users/login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: (results, error, data) => error ? [] : [{type: "auth", id: "LOGIN"}],
    }),
    currentUser: build.query({
      query: () => ({
        url: '/api/users/current',
      }),
      providesTags: (results, error, data) => [{type: "auth", id: "LOGIN"}],
    }),
  }),
});

export const { useLoginMutation, useCurrentUserQuery } = authApi;
