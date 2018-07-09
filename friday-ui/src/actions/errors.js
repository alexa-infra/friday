import * as alerts from './alerts';
import { unauthorized } from './auth';


export const handleErrors = (status = 0) => dispatch => {
  switch (status) {
    case 400:
      dispatch(alerts.error('400'));
      break;
    case 401:
      dispatch(alerts.error('401'));
      dispatch(unauthorized());
      break;
    case 403:
      dispatch(alerts.error('403'));
      break;
    case 404:
      dispatch(alerts.error('404'));
      break;
    case 422:
      dispatch(alerts.error('422'));
      break;
    case 0:
      dispatch(alerts.error('Network failure'));
      break;
    default:
      dispatch(alerts.error(status));
      break;
  }
}
