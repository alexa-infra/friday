import * as api from '../api';
import { callApi, createAction } from './utils';
import * as Actions from '../constants/recipes.actions';

export const getRecipes = callApi(api.getRecipes, Actions.LIST);
export const shuffleRecipes = () => createAction(Actions.SHUFFLE);
