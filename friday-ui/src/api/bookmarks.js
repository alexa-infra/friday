import { makeAuthHeader, jsonOrReject, emptyOrReject } from './utils'


const formatData = data => {
  const { url, title, readed } = data;
  return { url, title, readed };
}

export const getBookmarks = (auth, search, page, per_page) => {
  const params = new URLSearchParams();
  if (search)
    params.append('search', search);
  params.append('page', page)
  params.append('per_page', per_page);
  return fetch('/api/bookmarks?' + params.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...makeAuthHeader(auth),
    },
  }).then(jsonOrReject)
}

export const createBookmark = (auth, data) => {
  return fetch('/api/bookmarks', {
    method: 'POST',
    body: JSON.stringify(formatData(data)),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...makeAuthHeader(auth),
    }
  }).then(jsonOrReject)
}

export const updateBookmark = (auth, data) => {
  return fetch(`/api/bookmarks/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(formatData(data)),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...makeAuthHeader(auth),
    }
  }).then(jsonOrReject)
}

export const deleteBookmark = (auth, data) => {
  return fetch(`/api/bookmarks/${data.id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      ...makeAuthHeader(auth),
    }
  }).then(emptyOrReject)
}
