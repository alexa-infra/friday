import { alerts } from '../actions'

export const apiErrorMiddleware = store => next => action => {
  const result = next(action);
  if (result.type.indexOf('FAILURE') !== -1) {
    const { error } = result.data;
    const status = error.status || 0;
    switch (status) {
      case 400:
        store.dispatch(alerts.error('400'));
        break;
      case 401:
        store.dispatch(alerts.error('401'));
        break;
      case 403:
        store.dispatch(alerts.error('403'));
        break;
      case 404:
        store.dispatch(alerts.error('404'));
        break;
      case 0:
        store.dispatch(alerts.error('Network failure'));
        break;
      default:
        store.dispatch(alerts.error(status));
        break;
    }
  }
  return result;
}
