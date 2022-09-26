import { wrap, callApi } from './utils';


const isRootList = listid => listid === 'root' || listid === 'focus' || listid === 'trash';

const getRootList = listid => ({
  id: listid,
  created: null,
  updated: null,
  deleted: false,
  parent_id: null,
  name: listid,
  description: '',
  order: 0,
  dueto: null,
  done: false,
  focus: false,
  is_root: true,
});

export const createTodoItem = wrap(({ parent_id, ...rest }) => ({
  url: `/api/todo`,
  method: 'POST',
  body: {
    parent_id: isRootList(parent_id) ? null : parent_id,
    ...rest,
  },
}));

export const changeTodoItem = ({id, parent_id, ...rest}) => {
  delete rest.created;
  delete rest.updated;
  return callApi({
    url: `/api/todo/${id}`,
    method: 'PUT',
    body: {
      parent_id: isRootList(parent_id) ? null : parent_id,
      ...rest,
    },
  });
}

export const updateTodoItem = wrap(({id, ...rest}) => ({
  url: `/api/todo/${id}`,
  method: 'PATCH',
  body: rest,
}));

export const removeTodoItem = wrap(itemid => ({
  url: `/api/todo/${itemid}`,
  method: 'DELETE',
}));

export const getTodoItem = itemid => {
  if(isRootList(itemid)){
    return getRootList(itemid);
  }
  return callApi({
    url: `/api/todo/${itemid}`,
    method: 'GET',
  });
}

export const getTodoListItems = wrap(itemid => ({
  url: `/api/todo/${itemid}/items`,
  method: 'GET',
}));
