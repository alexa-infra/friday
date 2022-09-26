import { wrap } from './utils';

const formatLinkData = ({ url, title }) => ({ url, title });

export const getLinks = wrap(() => ({
  method: 'GET',
  url: '/api/links?per_page=100',
}));

export const createLink = wrap((data) => ({
  method: 'POST',
  url: '/api/links',
  body: formatLinkData(data),
}));

export const updateLink = wrap((data) => ({
  method: 'PUT',
  url: `/api/links/${data.id}`,
  body: formatLinkData(data),
}));

export const deleteLink = wrap((data) => ({
  method: 'DELETE',
  url: `/api/links/${data.id}`,
}));
