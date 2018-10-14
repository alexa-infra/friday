
export const jsonOrReject = result => {
  if (result.ok)
    return result.json()
  return Promise.reject({
    name: 'ResponseError',
    message: '',
    status: result.status,
  })
}

export const emptyOrReject = result => {
  if (result.ok)
    return {}
  return Promise.reject({
    name: 'ResponseError',
    message: '',
    status: result.status,
  })
}

export const textOrReject = result => {
  if (result.ok)
    return result.text();
  return Promise.reject({
    name: 'ResponseError',
    message: '',
    status: result.status,
  })
}
