import { jsonOrReject } from './utils'


export const getRecipes = page => {
  return fetch('/api/recipes', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }).then(jsonOrReject);
}
