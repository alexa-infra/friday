import * as api from '../api';
import { callApi } from './utils';


export const getTags = callApi(api.getTags, 'TAGS_LIST');
