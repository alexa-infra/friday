import { wrap } from './utils'


const formatData = data => {
  const { url, title, readed } = data;
  return { url, title, readed };
}

const searchParams = ({search, page, per_page}) => {
  const params = new URLSearchParams();
  if (search)
    params.append('search', search);
  params.append('page', page)
  params.append('per_page', per_page);
  return params.toString()
}

export const getBookmarks = wrap(data => ({
  url: '/api/bookmarks?' + searchParams(data),
  method: 'GET',
}))

export const createBookmark = wrap(data => ({
  url: '/api/bookmarks',
  method: 'POST',
  body: formatData(data),
}))

export const updateBookmark = wrap(data => ({
  url: `/api/bookmarks/${data.id}`,
  method: 'PUT',
  body: formatData(data),
}))

export const deleteBookmark = wrap(data => ({
  url: `/api/bookmarks/${data.id}`,
  method: 'DELETE',
  body: formatData(data),
}))
