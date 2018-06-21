import { handleErrors } from './errors';


export const createAction = (type, data) => {
  return { type, data };
}

const _callApi = (method, actionName) => {
  const request = actionName + '_REQUEST';
  const success = actionName + '_SUCCESS';
  const failure = actionName + '_FAILURE';
  const requestAction = data => createAction(request, data);
  const successAction = data => createAction(success, data);
  const failureAction = error => createAction(failure, { error });
  return data => (dispatch, getState) => {
    dispatch(requestAction(data));
    return method(getState, data)
      .then(result => dispatch(successAction(result)))
      .catch(error => {
        dispatch(failureAction(error));
        dispatch(handleErrors(error.status));
      });
  };
}

export const callApi = (method, actionName) => {
  const newMethod = (getState, data) => {
    return method(data);
  }
  return _callApi(newMethod, actionName);
}

export const callApiAuth = (method, actionName) => {
  const newMethod = (getState, data) => {
    const { auth } = getState();
    return method(auth, data);
  }
  return _callApi(newMethod, actionName);
}
