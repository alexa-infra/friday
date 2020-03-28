import { createAsyncThunk as _createAsyncThunk } from '@reduxjs/toolkit';
import * as alerts from './alerts';
import { unauthorized } from './auth';


export const handleErrors = (err) => (dispatch) => {
  if (err.status !== undefined) {
    dispatch(alerts.error(err.message || err.status));
    if (err.status === 401) dispatch(unauthorized());
  } else {
    dispatch(alerts.error(err));
  }
};

export const createAsyncThunk = (type, payloadCreator) => _createAsyncThunk(type, async (arg, opt) => {
  const { dispatch } = opt;
  try {
    return await payloadCreator(arg, opt);
  } catch (err) {
    dispatch(handleErrors(err));
    throw err;
  }
});
