import { makeAuthHeader, jsonOrReject } from './utils'


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
