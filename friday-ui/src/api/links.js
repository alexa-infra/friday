import { makeAuthHeader, jsonOrReject, emptyOrReject } from './utils'


const formatLinkData = ({url, title}) => {
  return {url, title}
}

export const getLinks = (auth, page) => {
  return fetch('/api/links?per_page=100', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...makeAuthHeader(auth),
    },
  }).then(jsonOrReject)
}

export const createLink = (auth, data) => {
  return fetch('/api/links', {
    method: 'POST',
    body: JSON.stringify(formatLinkData(data)),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...makeAuthHeader(auth),
    }
  }).then(jsonOrReject)
}

export const updateLink = (auth, data) => {
  return fetch(`/api/links/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(formatLinkData(data)),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...makeAuthHeader(auth),
    }
  }).then(jsonOrReject)
}

export const deleteLink = (auth, data) => {
  return fetch(`/api/links/${data.id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      ...makeAuthHeader(auth),
    }
  }).then(emptyOrReject)
}
