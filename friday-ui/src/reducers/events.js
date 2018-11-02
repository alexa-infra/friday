import * as moment from 'moment';
import * as Actions from '../constants/events.actions';

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
    case Actions.SELECT_MONTH:
      const date = action.data;
      return { ...initialState, month: date, ...calendarRange(date) };
    case Actions.LIST.SUCCESS:
      return { ...state, currentItem: null, items: action.data.map(convertItem) };
    case Actions.SHOW_EDIT:
      return { ...state, currentItem: action.data, editDisabled: false };
    case Actions.HIDE_EDIT:
      return { ...state, currentItem: null, editDisabled: true, newEventDate: null };
    case Actions.NEW.REQUEST:
    case Actions.EDIT.REQUEST:
    case Actions.DELETE.REQUEST:
    case Actions.REPEAT.REQUEST:
      return { ...state, editDisabled: true };
    case Actions.NEW.FAILURE:
    case Actions.EDIT.FAILURE:
    case Actions.DELETE.FAILURE:
    case Actions.REPEAT.FAILURE:
      return { ...state, editDisabled: false };
    case Actions.NEW.SUCCESS:
    case Actions.EDIT.SUCCESS:
    case Actions.DELETE.SUCCESS:
    case Actions.REPEAT.SUCCESS:
      return { ...state, newEventDate: null, currentItem: null, editDisabled: false };
    case Actions.SHOW_EDIT_NEW:
      return { ...state, newEventDate: action.data, editDisabled: false }
    default:
      return state;
  }
}
