import * as moment from 'moment';
import { Actions } from '../constants';

const calendarRange = (date) => {
  const firstDay = date.clone().startOf('month').startOf('isoWeek');
  const lastDay = date.clone().endOf('month').endOf('isoWeek');
  return { firstDay, lastDay }
}

const today = moment().startOf('day');

const initialState = {
  currentItem: null,
  editDisabled: false,
  newEventDate: null,
  items: [],
  month: today,
  ...calendarRange(today),
};

const parseDate = str => moment(str, 'YYYY-MM-DD');

const convertItem = (it) => {
  return {
    date: parseDate(it.date),
    event: {
      ...it.event,
      date: parseDate(it.event.date)
    },
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.EVENTS_SELECT_MONTH:
      const date = action.data;
      return { ...initialState, month: date, ...calendarRange(date) };
    case Actions.EVENTS_SUCCESS:
      return { ...state, currentItem: null, items: action.data.map(convertItem) };
    case Actions.EVENTS_SHOW_EDIT:
      return { ...state, currentItem: action.data, editDisabled: false };
    case Actions.EVENTS_HIDE_EDIT:
      return { ...state, currentItem: null, editDisabled: true, newEventDate: null };
    case Actions.EVENTS_NEW_REQUEST:
    case Actions.EVENTS_EDIT_REQUEST:
    case Actions.EVENTS_DELETE_REQUEST:
      return { ...state, editDisabled: true };
    case Actions.EVENTS_NEW_FAILURE:
    case Actions.EVENTS_EDIT_FAILURE:
    case Actions.EVENTS_DELETE_FAILURE:
      return { ...state, editDisabled: false };
    case Actions.EVENTS_NEW_SUCCESS:
    case Actions.EVENTS_EDIT_SUCCESS:
    case Actions.EVENTS_DELETE_SUCCESS:
      return { ...state, newEventDate: null, currentItem: null, editDisabled: false };
    case Actions.EVENTS_SHOW_EDIT_NEW:
      return { ...state, newEventDate: action.data, editDisabled: false }
    default:
      return state;
  }
}
