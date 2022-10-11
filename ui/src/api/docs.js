import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';

const searchParams = ({ tag, page, per_page }) => {
  const params = new URLSearchParams();
  if (tag) params.append('tag', tag);
  params.append('page', page);
  params.append('per_page', per_page);
  return params.toString();
};

const tagType = 'doc';
const contentTagType = 'doc-content';

export const docApi = createApi({
  baseQuery,
  reducerPath: 'doc',
  tagTypes: [tagType, contentTagType],
  endpoints: (build) => ({
    getDocs: build.query({
      query: (params) => ({
        url: `/api/docs?${searchParams(params)}`,
      }),
      providesTags: (result, error, params) =>
        result
          ? [
              ...result.items.map((x) => ({
                type: tagType,
                id: x.id,
              })),
              { type: tagType, id: 'PARTIAL-LIST' },
            ]
          : [{ type: tagType, id: 'PARTIAL-LIST' }],
    }),
    getDoc: build.query({
      query: (id) => ({
        url: `/api/docs/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: tagType, id }],
    }),
    createDoc: build.mutation({
      query: ({ name, tags }) => ({
        url: '/api/docs',
        method: 'POST',
        body: { name, tags },
      }),
      invalidatesTags: (result, error, data) => [
        { type: tagType, id: 'PARTIAL-LIST' },
      ],
    }),
    updateDoc: build.mutation({
      query: ({ id, name, tags }) => ({
        url: `/api/docs/${id}`,
        method: 'PUT',
        body: { name, tags },
      }),
      invalidatesTags: (result, error, data) => [
        { type: tagType, id: data.id },
        { type: tagType, id: 'PARTIAL-LIST' },
      ],
    }),
    deleteDoc: build.mutation({
      query: (data) => ({
        url: `/api/docs/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, data) => [
        { type: tagType, id: data.id },
        { type: tagType, id: 'PARTIAL-LIST' },
      ],
    }),
    getDocText: build.query({
      query: (id) => ({
        url: `/api/docs/${id}/text`,
        responseHandler: (response) => response.text(),
      }),
      providesTags: (result, error, id) => [{ type: contentTagType, id }],
    }),
    putDocText: build.mutation({
      query: ({ id, text }) => ({
        url: `/api/docs/${id}/text`,
        method: 'PUT',
        headers: {
          'content-type': 'text/plain',
        },
        body: text,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: (result, error, data) => [
        { type: contentTagType, id: data.id },
      ],
    }),
    getDocHtml: build.query({
      query: (id) => ({
        url: `/api/docs/${id}/html`,
        responseHandler: (response) => response.text(),
      }),
      providesTags: (result, error, id) => [{ type: contentTagType, id }],
    }),
  }),
});

export const {
  useGetDocsQuery,
  useGetDocQuery,
  useCreateDocMutation,
  useUpdateDocMutation,
  useDeleteDocMutation,
  useGetDocTextQuery,
  useGetDocHtmlQuery,
  usePutDocTextMutation,
} = docApi;
