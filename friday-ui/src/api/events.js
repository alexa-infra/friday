import { jsonOrReject, emptyOrReject } from './utils'


const formatDate = dt => dt.format('YYYY-MM-DD');

const formatEventData = ({name, icon, date, repeat}) => {
  return {
    name: name,
    icon: icon,
    repeat: repeat === 'none' ? null : repeat,
    date: formatDate(date),
  }
}

export const getEvents = (fromdate, todate) => {
  const params = new URLSearchParams();
  params.append('fromdate', formatDate(fromdate));
  params.append('todate', formatDate(todate));
  return fetch('/api/events?' + params.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }).then(jsonOrReject)
}

export const createEvent = data => {
  return fetch('/api/events', {
    method: 'POST',
    body: JSON.stringify(formatEventData(data)),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(jsonOrReject)
}

export const updateEvent = data => {
  return fetch(`/api/events/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(formatEventData(data)),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(jsonOrReject)
}

export const deleteEvent = data => {
  return fetch(`/api/events/${data.id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
    }
  }).then(emptyOrReject)
}

export const repeatEvent = data => {
  return fetch(`/api/events/${data.id}/repeat`, {
    method: 'POST',
    body: JSON.stringify({days: data.repeatIn}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(jsonOrReject)
}
