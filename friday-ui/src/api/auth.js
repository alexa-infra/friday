import { jsonOrReject } from './utils'


export const login = (name, password) => {
  return fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({email: name, password}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(jsonOrReject)
}
