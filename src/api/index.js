
export const getLinks = page => {
  return fetch('/api/links/all?pageSize=100')
    .then(result => result.json())
}