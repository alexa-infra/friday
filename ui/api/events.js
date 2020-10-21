import { wrap } from './utils';


const formatEventData = ({
  name, icon, date, repeat,
}) => ({
  name,
  icon,
  repeat: repeat === 'none' ? null : repeat,
  date,
});

const searchParams = ({ fromdate, todate }) => {
  const params = new URLSearchParams();
  params.append('fromdate', fromdate);
  params.append('todate', todate);
  return params.toString();
};

export const getEvents = wrap((data) => ({
  url: `/api/events?${searchParams(data)}`,
  method: 'GET',
}));

export const createEvent = wrap((data) => ({
  url: '/api/events',
  method: 'POST',
  body: formatEventData(data),
}));

export const updateEvent = wrap((data) => ({
  url: `/api/events/${data.id}`,
  method: 'PUT',
  body: formatEventData(data),
}));

export const deleteEvent = wrap((data) => ({
  url: `/api/events/${data.id}`,
  method: 'DELETE',
}));

export const repeatEvent = wrap((data) => ({
  url: `/api/events/${data.id}/repeat`,
  method: 'POST',
  body: { days: data.repeatIn },
}));
