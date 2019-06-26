import { wrap } from './utils'


export const login = wrap(({ email, password }) => ({
  url: '/api/users/login',
  method: 'POST',
  body: { email, password },
}))

export const currentUser = wrap(() => ({
  url: '/api/users/current',
  method: 'GET',
}))
