
const formatDate = dt => dt.format('YYYY-MM-DD');

const makeAuthHeader = auth => {
  if (auth.token) {
    return { Authorization: `Bearer ${auth.token}` };
  }
  return {};
}

const jsonOrReject = result => {
  if (result.ok)
    return result.json()
  return Promise.reject({
    name: 'ResponseError',
    message: '',
    status: result.status,
  })
}

const emptyOrReject = result => {
  if (result.ok)
    return {}
  return Promise.reject({
    name: 'ResponseError',
    message: '',
    status: result.status,
  })
}

export const getLinks = (auth, page) => {
  return fetch('/api/links?per_page=100', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...makeAuthHeader(auth),
    },
  }).then(jsonOrReject)
}

export const getEvents = (auth, fromdate, todate) => {
  const params = new URLSearchParams();
  params.append('fromdate', formatDate(fromdate));
  params.append('todate', formatDate(todate));
  return fetch('/api/events?' + params.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...makeAuthHeader(auth),
    },
  }).then(jsonOrReject)
}

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

const formatEventData = ({name, icon, date, repeat}) => {
  return {
    name: name,
    icon: icon,
    repeat: repeat === 'none' ? null : repeat,
    date: formatDate(date),
  }
}

export const createEvent = (auth, data) => {
  return fetch('/api/events', {
    method: 'POST',
    body: JSON.stringify(formatEventData(data)),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...makeAuthHeader(auth),
    }
  }).then(jsonOrReject)
}

export const updateEvent = (auth, data) => {
  return fetch(`/api/events/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(formatEventData(data)),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...makeAuthHeader(auth),
    }
  }).then(jsonOrReject)
}

export const deleteEvent = (auth, data) => {
  return fetch(`/api/events/${data.id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      ...makeAuthHeader(auth),
    }
  }).then(emptyOrReject)
}

export const repeatEvent = (auth, data) => {
  return fetch(`/api/events/${data.id}/repeat`, {
    method: 'POST',
    body: JSON.stringify({days: data.repeatIn}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...makeAuthHeader(auth),
    }
  }).then(jsonOrReject)
}

const formatLinkData = ({url, title}) => {
  return {url, title}
}

export const createLink = (auth, data) => {
  return fetch('/api/links', {
    method: 'POST',
    body: JSON.stringify(formatLinkData(data)),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...makeAuthHeader(auth),
    }
  }).then(jsonOrReject)
}

export const updateLink = (auth, data) => {
  return fetch(`/api/links/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(formatLinkData(data)),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...makeAuthHeader(auth),
    }
  }).then(jsonOrReject)
}

export const deleteLink = (auth, data) => {
  return fetch(`/api/links/${data.id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      ...makeAuthHeader(auth),
    }
  }).then(emptyOrReject)
}
