import { jsonOrReject, emptyOrReject } from './utils'


const formatData = data => {
  const { url, title, readed } = data;
  return { url, title, readed };
}

export const getBookmarks = (search, page, per_page) => {
  const params = new URLSearchParams();
  if (search)
    params.append('search', search);
  params.append('page', page)
  params.append('per_page', per_page);
  return fetch('/api/bookmarks?' + params.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }).then(jsonOrReject)
}

export const createBookmark = data => {
  return fetch('/api/bookmarks', {
    method: 'POST',
    body: JSON.stringify(formatData(data)),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(jsonOrReject)
}

export const updateBookmark = data => {
  return fetch(`/api/bookmarks/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(formatData(data)),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(jsonOrReject)
}

export const deleteBookmark = data => {
  return fetch(`/api/bookmarks/${data.id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
    }
  }).then(emptyOrReject)
}
