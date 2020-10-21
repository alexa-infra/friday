import { wrap } from './utils';


export const getRecipes = wrap(() => ({
  url: '/api/recipes',
  method: 'GET',
}));
