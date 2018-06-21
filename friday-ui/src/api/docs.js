import { makeAuthHeader, jsonOrReject, textOrReject, emptyOrReject } from './utils'


const makeDoc = data => ({
  name: data.name,
  tags: data.tags,
})

export const getDocs = auth => {
  return fetch('/api/docs', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...makeAuthHeader(auth),
    },
  }).then(jsonOrReject)
}

export const getDoc = (auth, data) => {
  return fetch(`/api/docs/${data.id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...makeAuthHeader(auth),
    },
  }).then(jsonOrReject)
}

export const createDoc = (auth, data) => {
  return fetch('/api/docs', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...makeAuthHeader(auth),
    },
    body: JSON.stringify(makeDoc(data)),
  }).then(jsonOrReject)
}

export const updateDoc = (auth, data) => {
  return fetch(`/api/docs/${data.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...makeAuthHeader(auth),
    },
    body: JSON.stringify(makeDoc(data)),
  }).then(jsonOrReject)
}

export const deleteDoc = (auth, data) => {
  return fetch(`/api/docs/${data.id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      ...makeAuthHeader(auth),
    }
  }).then(emptyOrReject)
}

export const getDocText = (auth, data) => {
  return fetch(`/api/docs/${data.id}/text`, {
    method: 'GET',
    headers: {
      'Accept': 'text/plain, application/json',
      ...makeAuthHeader(auth),
    },
  }).then(textOrReject)
  .then(text => ({...data, text}));
}

export const putDocText = (auth, data) => {
  return fetch(`/api/docs/${data.id}/text`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'text/plain',
      'Accept': 'text/plain, application/json',
      ...makeAuthHeader(auth),
    },
    body: data.text,
  }).then(textOrReject)
  .then(text => ({...data, text}));
}

export const getDocHtml = (auth, data) => {
  return fetch(`/api/docs/${data.id}/html`, {
    method: 'GET',
    headers: {
      'Accept': 'text/html, application/json',
      ...makeAuthHeader(auth),
    },
  }).then(textOrReject)
  .then(html => ({...data, html}));
}
