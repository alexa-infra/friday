import { createSlice, createSelector } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isoWeek from 'dayjs/plugin/isoWeek';
import { createAsyncThunk } from './utils';
import * as api from '../api';
import { selectDialog } from './links';

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

export const getEvents = createAsyncThunk(
  'events/list',
  async (arg, { getState }) => {
    const month = selectMonth(getState());
    const firstDay = month.startOf('month').startOf('isoWeek');
    const lastDay = month.endOf('month').endOf('isoWeek');
    return await api.getEvents({
      fromdate: firstDay.format('YYYY-MM-DD'),
      todate: lastDay.format('YYYY-MM-DD'),
    });
  },
);
export const createEvent = createAsyncThunk('events/new', async (item) => await api.createEvent(item));
export const updateEvent = createAsyncThunk('events/edit', async (item) => await api.updateEvent(item));
export const deleteEvent = createAsyncThunk('events/delete', async (item) => await api.deleteEvent(item));
export const repeatEvent = createAsyncThunk('events/repeat', async (item) => await api.repeatEvent(item));

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    month: '',
    days: [],
    dayNames: getDaysOfWeek(),
    loading: 'idle',
    error: null,
    newDialog: {
      item: null,
      loading: 'idle',
      error: null,
    },
    editDialog: {
      item: null,
      loading: 'idle',
      error: null,
    },
  },
  reducers: {
    setMonth(state, action) {
      const monthStr = action.payload;
      state.month = monthStr;
      state.days = makeCalendar(monthStr);
    },
    showNew(state, action) {
      if (state.newDialog.item === null) {
        state.newDialog.item = action.payload;
        state.newDialog.error = null;
      }
    },
    hideNew(state, action) {
      if (state.newDialog.item !== null) {
        state.newDialog.item = null;
      }
    },
    showEdit(state, action) {
      if (state.editDialog.item === null) {
        state.editDialog.item = action.payload;
        state.editDialog.error = null;
      }
    },
    hideEdit(state, action) {
      if (state.editDialog.item !== null) {
        state.editDialog.item = null;
      }
    },
  },
  extraReducers: {
    [getEvents.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.error = null;
        state.loading = 'pending';
      }
    },
    [getEvents.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.events = action.payload;
        state.loading = 'idle';
      }
    },
    [getEvents.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.error = action.error;
        state.loading = 'idle';
      }
    },
    [createEvent.pending]: (state, action) => {
      if (state.newDialog.loading === 'idle') {
        state.newDialog.error = null;
        state.newDialog.loading = 'pending';
      }
    },
    [createEvent.fulfilled]: (state, action) => {
      if (state.newDialog.loading === 'pending') {
        state.newDialog.item = null;
        state.newDialog.loading = 'idle';
      }
    },
    [createEvent.rejected]: (state, action) => {
      if (state.newDialog.loading === 'pending') {
        state.newDialog.error = action.error;
        state.newDialog.loading = 'idle';
      }
    },
    [updateEvent.pending]: (state, action) => {
      if (state.editDialog.loading === 'idle') {
        state.editDialog.error = null;
        state.editDialog.loading = 'pending';
      }
    },
    [updateEvent.fulfilled]: (state, action) => {
      if (state.editDialog.loading === 'pending') {
        state.editDialog.item = null;
        state.editDialog.loading = 'idle';
      }
    },
    [updateEvent.rejected]: (state, action) => {
      if (state.editDialog.loading === 'pending') {
        state.editDialog.error = action.error;
        state.editDialog.loading = 'idle';
      }
    },
    [deleteEvent.pending]: (state, action) => {
      if (state.editDialog.loading === 'idle') {
        state.editDialog.error = null;
        state.editDialog.loading = 'pending';
      }
    },
    [deleteEvent.fulfilled]: (state, action) => {
      if (state.editDialog.loading === 'pending') {
        state.editDialog.item = null;
        state.editDialog.loading = 'idle';
      }
    },
    [deleteEvent.rejected]: (state, action) => {
      if (state.editDialog.loading === 'pending') {
        state.editDialog.error = action.error;
        state.editDialog.loading = 'idle';
      }
    },
    [repeatEvent.pending]: (state, action) => {
      if (state.editDialog.loading === 'idle') {
        state.editDialog.error = null;
        state.editDialog.loading = 'pending';
      }
    },
    [repeatEvent.fulfilled]: (state, action) => {
      if (state.editDialog.loading === 'pending') {
        state.editDialog.item = null;
        state.editDialog.loading = 'idle';
      }
    },
    [repeatEvent.rejected]: (state, action) => {
      if (state.editDialog.loading === 'pending') {
        state.editDialog.error = action.error;
        state.editDialog.loading = 'idle';
      }
    },
  },
});

export default eventsSlice.reducer;

const selectMonth = createSelector(
  (state) => state.events.month,
  (month) => (month ? dayjs(month, 'YYYY-MM') : dayjs().startOf('month')),
);

const { setMonth } = eventsSlice.actions;

export const nextMonth = () => (dispatch, getState) => {
  const month = selectMonth(getState());
  dispatch(setMonth(month.add(1, 'month').format('YYYY-MM')));
  dispatch(getEvents());
};

export const prevMonth = () => (dispatch, getState) => {
  const month = selectMonth(getState());
  dispatch(setMonth(month.subtract(1, 'month').format('YYYY-MM')));
  dispatch(getEvents());
};

export const currentMonth = () => (dispatch, getState) => {
  const month = selectMonth(getState());
  dispatch(setMonth(month.format('YYYY-MM')));
  dispatch(getEvents());
};

export const {
  showNew, hideNew, showEdit, hideEdit,
} = eventsSlice.actions;

export const selectCalendar = createSelector(
  (state) => state.events,
  (state) => ({
    events: state.events,
    month: state.month,
    days: state.days,
    dayNames: state.dayNames,
    loading: state.loading === 'pending',
    error: state.error,
  }),
);

export const selectEditDialog = createSelector(
  (state) => state.events.editDialog,
  selectDialog,
);

export const selectNewDialog = createSelector(
  (state) => state.events.newDialog,
  selectDialog,
);
