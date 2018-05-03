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
    default:
      return state;
  }
}
