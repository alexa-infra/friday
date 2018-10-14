import { jsonOrReject, emptyOrReject } from './utils'


const formatLinkData = ({url, title}) => {
  return {url, title}
}

export const getLinks = page => {
  return fetch('/api/links?per_page=100', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }).then(jsonOrReject)
}

export const createLink = data => {
  return fetch('/api/links', {
    method: 'POST',
    body: JSON.stringify(formatLinkData(data)),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(jsonOrReject)
}

export const updateLink = data => {
  return fetch(`/api/links/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(formatLinkData(data)),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(jsonOrReject)
}

export const deleteLink = data => {
  return fetch(`/api/links/${data.id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
    }
  }).then(emptyOrReject)
}
