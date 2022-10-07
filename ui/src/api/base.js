import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL,
  credentials: 'include',
  prepareHeaders: (headers, args) => {
    const csrfToken = getCookie('csrf_access_token');
    if (csrfToken) {
      headers.set('X-CSRF-TOKEN', csrfToken);
    }
    return headers;
  },
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
