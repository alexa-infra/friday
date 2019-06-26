import { wrap } from './utils'


const formatDate = dt => dt.format('YYYY-MM-DD');

const formatEventData = ({name, icon, date, repeat}) => {
  return {
    name: name,
    icon: icon,
    repeat: repeat === 'none' ? null : repeat,
    date: formatDate(date),
  }
}

const searchParams = ({fromdate, todate}) => {
  const params = new URLSearchParams();
  params.append('fromdate', formatDate(fromdate));
  params.append('todate', formatDate(todate));
  return params.toString()
}

export const getEvents = wrap(data => ({
  url: '/api/events?' + searchParams(data),
  method: 'GET',
}))

export const createEvent = wrap(data => ({
  url: '/api/events',
  method: 'POST',
  body: formatEventData(data),
}))

export const updateEvent = wrap(data => ({
  url: `/api/events/${data.id}`,
  method: 'PUT',
  body: formatEventData(data),
}))

export const deleteEvent = wrap(data => ({
  url: `/api/events/${data.id}`,
  method: 'DELETE',
}))

export const repeatEvent = wrap(data => ({
  url: `/api/events/${data.id}/repeat`,
  method: 'POST',
  body: {days: data.repeatIn},
}))
