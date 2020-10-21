import { createSlice } from '@reduxjs/toolkit';


export const Alerts = {
  SUCCESS: 'SUCCESS',
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
};

let alertId = 0;

const alertsSlice = createSlice({
  name: 'alerts',
  initialState: [],
  reducers: {
    add: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(type, text) {
        return { payload: { type, id: alertId++, message: text } };
      },
    },
    dismiss: {
      reducer(state, action) {
        const { id } = action.payload;
        state.splice(state.findIndex((x) => x.id === id), 1);
      },
      prepare(id) {
        return { payload: { id } };
      },
    },
  },
});

export default alertsSlice.reducer;

export const { add, dismiss } = alertsSlice.actions;

export const showAlert = (type, message, opts = {}) => (dispatch) => {
  const { timeout, hide } = { timeout: 3000, hide: true, ...opts };
  const addAction = add(type, message);
  const { id } = addAction.payload;
  dispatch(addAction);
  if (hide) setTimeout(() => dispatch(dismiss(id)), timeout);
};

export const dismissAlert = dismiss;
export const success = (msg, opts) => showAlert(Alerts.SUCCESS, msg, opts);
export const info = (msg, opts) => showAlert(Alerts.INFO, msg, opts);
export const warning = (msg, opts) => showAlert(Alerts.WARNING, msg, opts);
export const error = (msg, opts) => showAlert(Alerts.ERROR, msg, opts);
