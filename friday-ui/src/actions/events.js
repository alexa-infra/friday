import * as moment from 'moment';
import { Actions } from '../constants';
import * as api from '../api';
import { createAction, _callApi, callApi } from './utils';


export const nextMonth = () => (dispatch, getState) => {
  const { events } = getState();
  const { month } = events;
  const date = month.add(1, 'month');
  return Promise.resolve(dispatch(createAction(Actions.EVENTS_SELECT_MONTH, date)));
}

export const prevMonth = () => (dispatch, getState) => {
  const { events } = getState();
  const { month } = events;
  const date = month.subtract(1, 'month');
  return Promise.resolve(dispatch(createAction(Actions.EVENTS_SELECT_MONTH, date)));
}

export const currentMonth = () => dispatch => {
  const date = moment().startOf('month');
  return Promise.resolve(dispatch(createAction(Actions.EVENTS_SELECT_MONTH, date)));
}

export const getEvents = _callApi((getState, data) => {
  const { events } = getState();
  const { firstDay, lastDay } = events;
  return api.getEvents(firstDay, lastDay)
}, 'EVENTS');

export const createEvent = callApi(api.createEvent, 'EVENTS_NEW');
export const updateEvent = callApi(api.updateEvent, 'EVENTS_EDIT');
export const deleteEvent = callApi(api.deleteEvent, 'EVENTS_DELETE');
export const repeatEvent = callApi(api.repeatEvent, 'EVENTS_REPEAT');
