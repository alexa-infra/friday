import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from './base';


const isRootList = listid => listid === 'root' || listid === 'focus' || listid === 'trash';

const todoTagType = "todo";

export const todoApi = createApi({
  baseQuery,
  reducerPath: "todo",
  tagTypes: [todoTagType],
  endpoints: (build) => ({
    getTodo: build.query({
      query: (id) => ({
        url: `/api/todo/${id}`,
      }),
      providesTags: (result, error, id) => result ? [
        {type: todoTagType, id },
      ] : [],
    }),
    getTodoList: build.query({
      query: (id) => ({
        url: `/api/todo/${id}/items`,
      }),
      providesTags: (result, error, id) => result ? [
        ...result.map(x => ({type: todoTagType, id: x.id})),
        {type: todoTagType, id: 'LIST'},
      ] : [],
    }),
    createTodo: build.mutation({
      query: ({ parent_id, ...rest }) => ({
        url: '/api/todo',
        method: 'POST',
        body: {
          ...rest,
          parent_id: isRootList(parent_id) ? null : parent_id,
        },
      }),
      invalidatesTags: (result, error, data) => [
        {type: todoTagType, id: 'LIST'},
      ],
    }),
    updateTodo: build.mutation({
      query: ({ id, parent_id, created, updated, ...rest }) => ({
        url: `/api/todo/${id}`,
        method: 'PUT',
        body: {
          ...rest,
          parent_id: isRootList(parent_id) ? null : parent_id,
        },
      }),
      invalidatesTags: (result, error, data) => [
        {type: todoTagType, id: data.id},
        {type: todoTagType, id: 'LIST'},
      ],
    }),
    patchTodo: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/api/todo/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: (result, error, data) => [
        {type: todoTagType, id: data.id},
        {type: todoTagType, id: 'LIST'},
      ],
    }),
    deleteTodo: build.mutation({
      query: ({ id }) => ({
        url: `/api/todo/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, data) => [
        {type: todoTagType, id: data.id},
        {type: todoTagType, id: 'LIST'},
      ],
    }),
  }),
});

export const {
  useGetTodoQuery,
  useGetTodoListQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  usePatchTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
