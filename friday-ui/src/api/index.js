
export const getLinks = page => {
  return fetch('/api/links?per_page=100')
    .then(result => {
      if (result.ok)
        return result.json()
      return Promise.reject({
        name: 'ResponseError',
        message: '',
        status: result.status,
      })
    })
}

export { apiErrorMiddleware } from './middleware';
