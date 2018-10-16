import { jsonOrReject } from './utils'


export const getTags = () => {
  return fetch('/api/tags', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }).then(jsonOrReject);
}
