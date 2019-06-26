import { wrap } from './utils'


const makeDoc = data => ({
  name: data.name,
  tags: data.tags,
})

const searchParams = ({tag, page, per_page}) => {
  const params = new URLSearchParams();
  if (tag)
    params.append('tag', tag);
  params.append('page', page)
  params.append('per_page', per_page);
  return params.toString()
}

export const getDocs = wrap(data => ({
  url: '/api/docs?' + searchParams(data),
  method: 'GET',
}))

export const getDoc = wrap(data => ({
  url: `/api/docs/${data.id}`,
  method: 'GET',
}))

export const createDoc = wrap(data => ({
  url: '/api/docs',
  method: 'POST',
  body: makeDoc(data),
}))

export const updateDoc = wrap(data => ({
  url: `/api/docs/${data.id}`,
  method: 'PUT',
  body: makeDoc(data),
}))

export const deleteDoc = wrap(data => ({
  url: `/api/docs/${data.id}`,
  method: 'DELETE',
}))

export const getDocText = wrap(data => ({
  url: `/api/docs/${data.id}/text`,
  method: 'GET',
  text: true,
}))

export const putDocText = wrap(data => ({
  url: `/api/docs/${data.id}/text`,
  method: 'PUT',
  body: data.text,
  text: true,
}))

export const getDocHtml = wrap(data => ({
  url: `/api/docs/${data.id}/html`,
  method: 'GET',
  html: true,
}))

export const getDocsTagCloud = wrap(data => ({
  url: '/api/docs/tags',
  method: 'GET',
}))
