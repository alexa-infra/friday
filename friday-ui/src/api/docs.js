import { jsonOrReject, textOrReject, emptyOrReject } from './utils'


const makeDoc = data => ({
  name: data.name,
  tags: data.tags,
})

export const getDocs = () => {
  return fetch('/api/docs', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }).then(jsonOrReject)
}

export const getDoc = data => {
  return fetch(`/api/docs/${data.id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }).then(jsonOrReject)
}

export const createDoc = data => {
  return fetch('/api/docs', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(makeDoc(data)),
  }).then(jsonOrReject)
}

export const updateDoc = data => {
  return fetch(`/api/docs/${data.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(makeDoc(data)),
  }).then(jsonOrReject)
}

export const deleteDoc = data => {
  return fetch(`/api/docs/${data.id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
    }
  }).then(emptyOrReject)
}

export const getDocText = data => {
  return fetch(`/api/docs/${data.id}/text`, {
    method: 'GET',
    headers: {
      'Accept': 'text/plain, application/json',
    },
  }).then(textOrReject)
  .then(text => ({...data, text}));
}

export const putDocText = data => {
  return fetch(`/api/docs/${data.id}/text`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'text/plain',
      'Accept': 'text/plain, application/json',
    },
    body: data.text,
  }).then(textOrReject)
  .then(text => ({...data, text}));
}

export const getDocHtml = data => {
  return fetch(`/api/docs/${data.id}/html`, {
    method: 'GET',
    headers: {
      'Accept': 'text/html, application/json',
    },
  }).then(textOrReject)
  .then(html => ({...data, html}));
}
