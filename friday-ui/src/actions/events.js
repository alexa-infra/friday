import * as moment from 'moment';
import * as Actions from '../constants/events.actions';
import * as api from '../api';
import { createAction, _callApi, callApi } from './utils';


export const nextMonth = () => (dispatch, getState) => {
  const { events } = getState();
  const { month } = events;
  const date = month.add(1, 'month');
  return Promise.resolve(dispatch(createAction(Actions.SELECT_MONTH, date)));
}

export const prevMonth = () => (dispatch, getState) => {
  const { events } = getState();
  const { month } = events;
  const date = month.subtract(1, 'month');
  return Promise.resolve(dispatch(createAction(Actions.SELECT_MONTH, date)));
}

export const currentMonth = () => dispatch => {
  const date = moment().startOf('month');
  return Promise.resolve(dispatch(createAction(Actions.SELECT_MONTH, date)));
}

export const getEvents = _callApi((getState, data) => {
  const { events } = getState();
  const { firstDay, lastDay } = events;
  return api.getEvents(firstDay, lastDay)
}, Actions.LIST);

export const createEvent = callApi(api.createEvent, Actions.NEW);
export const updateEvent = callApi(api.updateEvent, Actions.EDIT);
export const deleteEvent = callApi(api.deleteEvent, Actions.DELETE);
export const repeatEvent = callApi(api.repeatEvent, Actions.REPEAT);

export const hideEdit = () => createAction(Actions.HIDE_EDIT);
export const showEdit = item => createAction(Actions.SHOW_EDIT, item);
export const showEditNew = item => createAction(Actions.SHOW_EDIT_NEW, item);
