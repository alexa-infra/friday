import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from './base';

const formatEventData = ({
  name, icon, date, repeat,
}) => ({
  name,
  icon,
  repeat: repeat === 'none' ? null : repeat,
  date,
});

const searchParams = ({ fromdate, todate }) => {
  const params = new URLSearchParams();
  params.append('fromdate', fromdate);
  params.append('todate', todate);
  return params.toString();
};

const eventTagType = "event";

export const eventApi = createApi({
  baseQuery,
  reducerPath: "event",
  tagTypes: [eventTagType],
  endpoints: (build) => ({
    getEvents: build.query({
      query: (params) => ({
        url: `/api/events?${searchParams(params)}`,
      }),
      providesTags: (result, error, params) => result ? [
        ...result.map(x => ({type: eventTagType, id: x.id})),
        {type: eventTagType, id: 'MONTH-LIST'},
      ] : [{type: eventTagType, id: 'MONTH-LIST'}],
    }),
    getEvent: build.query({
      query: (id) => ({
        url: `/api/events/${id}`,
      }),
      providesTags: (result, error, id) => [{type: eventTagType, id}],
    }),
    createEvent: build.mutation({
      query: (data) => ({
        url: '/api/events',
        method: 'POST',
        body: formatEventData(data),
      }),
      invalidatesTags: (result, error, data) => [{type: eventTagType, id: 'MONTH-LIST'}],
    }),
    updateEvent: build.mutation({
      query: (data) => ({
        url: `/api/events/${data.id}`,
        method: 'PUT',
        body: formatEventData(data),
      }),
      invalidatesTags: (result, error, data) => [
        {type: eventTagType, id: data.id},
        {type: eventTagType, id: 'MONTH-LIST'},
      ],
    }),
    deleteEvent: build.mutation({
      query: (data) => ({
        url: `/api/events/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, data) => [
        {type: eventTagType, id: data.id},
        {type: eventTagType, id: 'MONTH-LIST'},
      ],
    }),
    repeatEvent: build.mutation({
      query: (data) => ({
        url: `/api/events/${data.id}/repeat`,
        method: 'POST',
        body: { days: data.repeatIn },
      }),
      invalidatesTags: (result, error, data) => [
        {type: eventTagType, id: data.id},
        {type: eventTagType, id: 'MONTH-LIST'},
      ],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useRepeatEventMutation,
} = eventApi;
