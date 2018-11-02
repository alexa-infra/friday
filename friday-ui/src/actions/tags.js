import * as api from '../api';
import { callApi } from './utils';
import * as Actions from '../constants/tags.actions';


export const getTags = callApi(api.getTags, Actions.LIST);
