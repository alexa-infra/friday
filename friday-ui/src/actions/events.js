import * as moment from 'moment';
import { Actions } from '../constants';
import * as api from '../api';
import { createAction, _callApi, callApiAuth } from './utils';


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
  const { auth, events } = getState();
  const { firstDay, lastDay } = events;
  return api.getEvents(auth, firstDay, lastDay)
}, 'EVENTS');

export const createEvent = callApiAuth(api.createEvent, 'EVENTS_NEW');
export const updateEvent = callApiAuth(api.updateEvent, 'EVENTS_EDIT');
export const deleteEvent = callApiAuth(api.deleteEvent, 'EVENTS_DELETE');
export const repeatEvent = callApiAuth(api.repeatEvent, 'EVENTS_REPEAT');
