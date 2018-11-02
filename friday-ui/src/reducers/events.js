import * as moment from 'moment';
import { SELECT_MONTH, SHOW_EDIT, HIDE_EDIT, SHOW_EDIT_NEW, LIST, NEW, EDIT, DELETE, REPEAT } from '../constants/events.actions';

const calendarRange = (date) => {
  const firstDay = date.clone().startOf('month').startOf('isoWeek');
  const lastDay = date.clone().endOf('month').endOf('isoWeek');
  return { firstDay, lastDay }
}

const thisMonth = moment().startOf('month');

const initialState = {
  currentItem: null,
  editDisabled: false,
  newEventDate: null,
  items: [],
  month: thisMonth,
  ...calendarRange(thisMonth),
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
    case SELECT_MONTH:
      const date = action.data;
      return { ...initialState, month: date, ...calendarRange(date) };
    case LIST.SUCCESS:
      return { ...state, currentItem: null, items: action.data.map(convertItem) };
    case SHOW_EDIT:
      return { ...state, currentItem: action.data, editDisabled: false };
    case HIDE_EDIT:
      return { ...state, currentItem: null, editDisabled: true, newEventDate: null };
    case NEW.REQUEST:
    case EDIT.REQUEST:
    case DELETE.REQUEST:
    case REPEAT.REQUEST:
      return { ...state, editDisabled: true };
    case NEW.FAILURE:
    case EDIT.FAILURE:
    case DELETE.FAILURE:
    case REPEAT.FAILURE:
      return { ...state, editDisabled: false };
    case NEW.SUCCESS:
    case EDIT.SUCCESS:
    case DELETE.SUCCESS:
    case REPEAT.SUCCESS:
      return { ...state, newEventDate: null, currentItem: null, editDisabled: false };
    case SHOW_EDIT_NEW:
      return { ...state, newEventDate: action.data, editDisabled: false }
    default:
      return state;
  }
}
