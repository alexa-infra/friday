import { wrap } from './utils';

export const getTags = wrap(() => ({
  url: '/api/tags',
  method: 'GET',
}));
