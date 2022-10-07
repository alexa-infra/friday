import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from './base';
import { wrap } from './utils';

const makeDoc = (data) => ({
  name: data.name,
  tags: data.tags,
});

const searchParams = ({ tag, page, per_page }) => {
  const params = new URLSearchParams();
  if (tag) params.append('tag', tag);
  params.append('page', page);
  params.append('per_page', per_page);
  return params.toString();
};

export const getDocs = wrap((data) => ({
  url: `/api/docs?${searchParams(data)}`,
  method: 'GET',
}));

export const getDoc = wrap((data) => ({
  url: `/api/docs/${data.id}`,
  method: 'GET',
}));

export const createDoc = wrap((data) => ({
  url: '/api/docs',
  method: 'POST',
  body: makeDoc(data),
}));

export const updateDoc = wrap((data) => ({
  url: `/api/docs/${data.id}`,
  method: 'PUT',
  body: makeDoc(data),
}));

export const deleteDoc = wrap((data) => ({
  url: `/api/docs/${data.id}`,
  method: 'DELETE',
}));

export const getDocText = wrap((data) => ({
  url: `/api/docs/${data.id}/text`,
  method: 'GET',
  text: true,
}));

export const putDocText = wrap((data) => ({
  url: `/api/docs/${data.id}/text`,
  method: 'PUT',
  body: data.text,
  text: true,
}));

export const getDocHtml = wrap((data) => ({
  url: `/api/docs/${data.id}/html`,
  method: 'GET',
  html: true,
}));

export const getDocsTagCloud = wrap(() => ({
  url: '/api/docs/tags',
  method: 'GET',
}));

const tagType = "doc";
const contentTagType = "doc-content";

export const docApi = createApi({
  baseQuery,
  reducerPath: "doc",
  tagTypes: [tagType, contentTagType],
  endpoints: (build) => ({
    getDocs: build.query({
      query: (params) => ({
        url: `/api/docs?${searchParams(params)}`,
      }),
      providesTags: (result, error, params) => result ? [
        ...result.items.map(x => ({type: tagType, id: x.id})),
        {type: tagType, id: 'PARTIAL-LIST'},
      ] : [{type: tagType, id: 'PARTIAL-LIST'}],
    }),
    getDoc: build.query({
      query: (id) => ({
        url: `/api/docs/${id}`,
      }),
      providesTags: (result, error, id) => [{type: tagType, id}],
    }),
    createDoc: build.mutation({
      query: ({ name, tags }) => ({
        url: '/api/docs',
        method: 'POST',
        body: { name, tags },
      }),
      invalidatesTags: (result, error, data) => [{type: tagType, id: 'PARTIAL-LIST'}],
    }),
    updateDoc: build.mutation({
      query: ({ id, name, tags }) => ({
        url: `/api/docs/${id}`,
        method: 'PUT',
        body: { name, tags },
      }),
      invalidatesTags: (result, error, data) => [
        {type: tagType, id: data.id},
        {type: tagType, id: 'PARTIAL-LIST'},
      ],
    }),
    deleteDoc: build.mutation({
      query: (data) => ({
        url: `/api/docs/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, data) => [
        {type: tagType, id: data.id},
        {type: tagType, id: 'PARTIAL-LIST'},
      ],
    }),
    getDocText: build.query({
      query: (id) => ({
        url: `/api/docs/${id}/text`,
        responseHandler: (response) => response.text(),
      }),
      providesTags: (result, error, id) => [{type: contentTagType, id}],
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
        {type: contentTagType, id: data.id},
      ],
    }),
    getDocHtml: build.query({
      query: (id) => ({
        url: `/api/docs/${id}/html`,
        responseHandler: (response) => response.text(),
      }),
      providesTags: (result, error, id) => [{type: contentTagType, id}],
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
