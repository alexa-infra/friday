import { createSlice, createSelector } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeek);

function* iterDays(start, end) {
  let it = start;
  while (it.isSameOrBefore(end, 'day')) {
    yield it;
    it = it.add(1, 'days');
  }
}

const makeCalendar = (monthStr) => {
  const today = dayjs().startOf('day');
  const month = dayjs(monthStr, 'YYYY-MM');

  const firstDay = month.startOf('month').startOf('isoWeek');
  const lastDay = month.endOf('month').endOf('isoWeek');

  const days = [...iterDays(firstDay, lastDay)];
  return days.map((it) => ({
    day: it.format('YYYY-MM-DD'),
    dayNum: it.date(),
    today: it.isSame(today, 'day'),
    weekend: it.isoWeekday() === 6 || it.isoWeekday() === 7,
    prevMonth: it.isBefore(month, 'month'),
    thisMonth: it.isSame(month, 'month'),
    nextMonth: it.isAfter(month, 'month'),
    numWeeks: Math.floor(days.length / 7),
  }));
};

const getDaysOfWeek = () => {
  const today = dayjs();
  const firstDay = today.startOf('isoWeek');
  const lastDay = today.endOf('isoWeek');
  const days = [...iterDays(firstDay, lastDay)];
  return days.map((day) => day.format('ddd'));
};

export const eventsSlice = createSlice({
  name: 'calendar',
  initialState: {
    month: dayjs().format('YYYY-MM'),
    days: makeCalendar(dayjs().format('YYYY-MM')),
    dayNames: getDaysOfWeek(),
  },
  reducers: {
    setMonth(state, action) {
      const monthStr = action.payload;
      state.month = monthStr;
      state.days = makeCalendar(monthStr);
    },
  },
});

export const selectMonth = createSelector(
  (state) => state.calendar.month,
  (monthStr) => {
    const month = monthStr
      ? dayjs(monthStr, 'YYYY-MM')
      : dayjs().startOf('month');
    const firstDay = month.startOf('month').startOf('isoWeek');
    const lastDay = month.endOf('month').endOf('isoWeek');
    return { month, firstDay, lastDay };
  },
);

const { setMonth } = eventsSlice.actions;

export const nextMonth = () => (dispatch, getState) => {
  const { month } = selectMonth(getState());
  dispatch(setMonth(month.add(1, 'month').format('YYYY-MM')));
};

export const prevMonth = () => (dispatch, getState) => {
  const { month } = selectMonth(getState());
  dispatch(setMonth(month.subtract(1, 'month').format('YYYY-MM')));
};

export const currentMonth = () => (dispatch, getState) => {
  dispatch(setMonth(dayjs().format('YYYY-MM')));
};

export const selectCalendar = createSelector(
  (state) => state.calendar,
  (state) => ({
    month: state.month,
    days: state.days,
    dayNames: state.dayNames,
  }),
);
