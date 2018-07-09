import { makeAuthHeader, jsonOrReject, emptyOrReject } from './utils'


const formatDate = dt => dt.format('YYYY-MM-DD');

const formatEventData = ({name, icon, date, repeat}) => {
  return {
    name: name,
    icon: icon,
    repeat: repeat === 'none' ? null : repeat,
    date: formatDate(date),
  }
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
