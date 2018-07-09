import { createAction } from './utils';
import { Actions, Alerts } from '../constants';


const addAlert = data => createAction(Actions.ADD_ALERT, data);
const removeAlert = data => createAction(Actions.DISMISS_ALERT, data);

let alertId = 0;

export const showAlert = (type, message, opt={}) => dispatch => {
  const { timeout, hide } = Object.assign({timeout: 3000, hide: true}, opt);
  const id = alertId++;
  dispatch(addAlert({ type, message, id }));
  if (hide)
    setTimeout(() => dispatch(removeAlert({ id })), timeout);
}
export const dismissAlert = id => removeAlert({ id });

export const success = (msg, opt) => showAlert(Alerts.SUCCESS, msg, opt);
export const info = (msg, opt) => showAlert(Alerts.INFO, msg, opt);
export const warning = (msg, opt) => showAlert(Alerts.WARNING, msg, opt);
export const error = (msg, opt) => showAlert(Alerts.ERROR, msg, opt);
