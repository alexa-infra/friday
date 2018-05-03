
const formatDate = dt => dt.format('YYYY-MM-DD');

export const getLinks = (auth, page) => {
  let headers = {};
  if (auth.token) {
    headers['Authorization'] = `Bearer ${auth.token}`;
  }
  return fetch('/api/links?per_page=100', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...headers,
    },
  })
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

export const getEvents = (auth, fromdate, todate) => {
  let headers = {};
  if (auth.token) {
    headers['Authorization'] = `Bearer ${auth.token}`;
  }
  return fetch(`/api/events?fromdate=${formatDate(fromdate)}&todate=${formatDate(todate)}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...headers,
    },
  })
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

export const login = (name, password) => {
  return fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({email: name, password}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(result => {
    if (result.ok)
      return result.json();
    return Promise.reject({
      name: 'ResponseError',
      message: '',
      status: result.status,
    });
  })
}
