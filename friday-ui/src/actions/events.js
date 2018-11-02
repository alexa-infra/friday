import * as moment from 'moment';
import { SELECT_MONTH, SHOW_EDIT, HIDE_EDIT, SHOW_EDIT_NEW, LIST, NEW, EDIT, DELETE, REPEAT } from '../constants/events.actions';
import * as api from '../api';
import { createAction, _callApi, callApi } from './utils';


export const nextMonth = () => (dispatch, getState) => {
  const { events } = getState();
  const { month } = events;
  const date = month.add(1, 'month');
  return Promise.resolve(dispatch(createAction(SELECT_MONTH, date)));
}

export const prevMonth = () => (dispatch, getState) => {
  const { events } = getState();
  const { month } = events;
  const date = month.subtract(1, 'month');
  return Promise.resolve(dispatch(createAction(SELECT_MONTH, date)));
}

export const currentMonth = () => dispatch => {
  const date = moment().startOf('month');
  return Promise.resolve(dispatch(createAction(SELECT_MONTH, date)));
}

export const getEvents = _callApi((getState, data) => {
  const { events } = getState();
  const { firstDay, lastDay } = events;
  return api.getEvents(firstDay, lastDay)
}, LIST);

export const createEvent = callApi(api.createEvent, NEW);
export const updateEvent = callApi(api.updateEvent, EDIT);
export const deleteEvent = callApi(api.deleteEvent, DELETE);
export const repeatEvent = callApi(api.repeatEvent, REPEAT);

export const hideEdit = () => createAction(HIDE_EDIT);
export const showEdit = item => createAction(SHOW_EDIT, item);
export const showEditNew = item => createAction(SHOW_EDIT_NEW, item);
