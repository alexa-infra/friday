import { handleErrors } from './errors';


export const createAction = (type, data) => {
  return { type, data };
}

export const callApi = (method, action) => {
  const requestAction = data => createAction(action.REQUEST, data);
  const successAction = data => createAction(action.SUCCESS, data);
  const failureAction = error => createAction(action.FAILURE, { error });
  return data => (dispatch, getState) => {
    dispatch(requestAction(data));
    return method(data, getState)
      .then(result => {
        dispatch(successAction(result));
        return result;
      })
      .catch(error => {
        dispatch(failureAction(error));
        dispatch(handleErrors(error.status));
      });
  };
}
