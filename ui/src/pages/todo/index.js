import React from 'react';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';
import { Modal, ModalHeader, ModalFooter } from '../../components/modal';
import Button from '../../components/button';
import { useGetTodoQuery, useGetTodoListQuery, usePatchTodoMutation, useDeleteTodoMutation, useCreateTodoMutation, useUpdateTodoMutation } from '../../api';


export const FormFields = () => (
  <>
    <label htmlFor="name">Name</label>
    <Field name="name" component="input" type="text" />

    <label htmlFor="description">Description</label>
    <Field name="description" component="textarea" />

    <label htmlFor="order">Order</label>
    <Field name="order" component="input" type="number" />

    <label htmlFor="dueto">Due to</label>
    <Field name="dueto" component="input" type="date" />

    <label htmlFor="done">
      <Field name="done" component="input" type="checkbox" />
      <span>Done</span>
    </label>

    <label htmlFor="focus">
      <Field name="focus" component="input" type="checkbox" />
      <span>Focus</span>
    </label>

    <label htmlFor="folder">
      <Field name="folder" component="input" type="checkbox" />
      <span>Folder</span>
    </label>
  </>
);

const NewTodoDialog = ({ show, hide, data }) => {
  const [create, createState] = useCreateTodoMutation();
  React.useEffect(() => {
    if (createState.isSuccess) {
      createState.reset();
      hide();
    }
  }, [createState, hide]);
  return (
    <Modal isOpen={show} onRequestClose={hide} >
      <Form
        enableReinitialize
        onSubmit={create}
        initialValues={data}
      >
        {({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ModalHeader onClose={hide}>New TODO</ModalHeader>

            {createState.error && (
              <i>{createState.error.message}</i>
            )}
            <FormFields />

            <ModalFooter>
              <Button
                type="submit"
                disabled={submitting || pristine || createState.isFetching}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        )}
      </Form>
    </Modal>
  );
}

const EditTodoDialog = ({ show, hide, data }) => {
  const [update, updateState] = useUpdateTodoMutation();
  React.useEffect(() => {
    if (updateState.isSuccess) {
      updateState.reset();
      hide();
    }
  }, [updateState, hide]);
  return (
    <Modal isOpen={show} onRequestClose={hide}>
      <Form
        enableReinitialize
        onSubmit={update}
        initialValues={data}
      >
        {({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ModalHeader onClose={hide}>Edit TODO</ModalHeader>

            {updateState.error && (
              <i>{updateState.error.message}</i>
            )}
            <FormFields />

            <ModalFooter>
              <Button
                type="submit"
                disabled={submitting || pristine || update.isFetching}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        )}
      </Form>
    </Modal>
  );
}

const ButtonFlat = ({ children, ...rest }) => (
  <div className="inline-block w-6 h-6 text-center hover:cursor-pointer" {...rest}>
    {children}
  </div>
);

const TodoListItem = ({item, actions}) => (
  <div className="flex flex-wrap border-black md:border-r border-b p-2">
    <ButtonFlat onClick={() => actions.onDone(item)}>
     <i className={classNames('far', {
       'fa-check-square': item.done,
       'fa-square': !item.done,
     })} />
    </ButtonFlat>
    <ButtonFlat onClick={() => actions.onFocus(item)}>
      <i className={classNames("fa-star", {
        "fas": item.focus,
        "far": !item.focus,
      })} />
    </ButtonFlat>
    <ButtonFlat onClick={() => actions.onEdit(item)}>
      <i className="far fa-file" />
    </ButtonFlat>
    <span className="flex-grow">
      {item.name}
      {item.folder ? (
        <ButtonFlat onClick={() => actions.onOpen(item)}>
          <i className="far fa-folder" />
        </ButtonFlat>
      ) : (
        null
      )}
    </span>
    {item.dueto ? (
      <span className="text-xs font-bold rounded px-2 py-1 border border-black mr-1">{item.dueto}</span>
    ) : (
      null
    )}
    {!item.done ? (
      <ButtonFlat onClick={() => actions.onMarkDelete(item)}>
        <i className={classNames({
          'far fa-trash-alt': !item.deleted,
          'fas fa-trash-restore': item.deleted,
        })} />
      </ButtonFlat>
    ) : (
      <ButtonFlat onClick={() => actions.onDone(item)}>
        <i className="fas fa-trash-restore" />
      </ButtonFlat>
    )}
    {(item.done || item.deleted) && (
      <ButtonFlat onClick={() => actions.onDelete(item)}>
        <i className="fas fa-times" />
      </ButtonFlat>
    )}
  </div>
);

const defaultTodo = {
  done: false,
  focus: false,
  deleted: false,
  folder: false,
  order: 0,
  dueto: null,
  description: '',
};

export const TodoList = () => {
  const [currentId, setCurrentId] = React.useState('focus');
  const { data: list, isLoading: listIsLoading } = useGetTodoQuery(currentId);
  const { data: items, isLoading: itemIsLoading } = useGetTodoListQuery(currentId);
  const [patch, ] = usePatchTodoMutation();
  const [remove, ] = useDeleteTodoMutation();
  const [newItem, setNewItem] = React.useState(null);
  const [editItem, setEditItem] = React.useState(null);
  const actions = {
    onDone: item => patch({id: item.id, done: !item.done}),
    onFocus: item => patch({id: item.id, focus: !item.focus}),
    onMarkDelete: item => patch({id: item.id, deleted: !item.deleted}),
    onEdit: item => setEditItem(item),
    onOpen: item => setCurrentId(item.id),
    onDelete: item => remove(item),
  };
  if (listIsLoading || itemIsLoading) {
    return null;
  }
  const activeItems = items.filter(x => !x.done && !x.deleted);
  const doneItems = items.filter(x => x.done || x.deleted);
  return (
    <div className="todo-page md:w-8/12 md:mx-auto">
      <NewTodoDialog
        data={newItem}
        show={newItem !== null}
        hide={() => setNewItem(null)}
      />
      <EditTodoDialog
        data={editItem}
        show={editItem !== null}
        hide={() => setEditItem(null)}
      />
      <div className="my-2">
        <Button onClick={() => setNewItem({ parent_id: currentId, ...defaultTodo })}>
          <i className="fa fa-plus" />
        </Button>
        {list.is_root === undefined && (
          <Button onClick={() => setCurrentId(list.parent_id ?? 'root')}>
            <i className="fas fa-level-up-alt" />
          </Button>
        )}
        <Button
          isActive={list.is_root === true && list.name === "root"}
          onClick={() => setCurrentId('root')}
        >
          Root
        </Button>
        <Button
          isActive={list.is_root === true && list.name === "trash"}
          onClick={() => setCurrentId('trash')}
        >
          Trash
        </Button>
        <Button
          isActive={list.is_root === true && list.name === "focus"}
          onClick={() => setCurrentId('focus')}
        >
          Focus
        </Button>
      </div>
      {activeItems.length > 0 && (
        <div className="todo-list border-black border-t md:border-l">
          {activeItems.map(it => (
            <TodoListItem key={it.id} item={it} actions={actions} />
          ))}
        </div>
      )}
      {doneItems.length > 0 && (
        <>
          <h2>Inactive</h2>
          <div className="todo-list border-black border-t md:border-l">
            {doneItems.map(it => (
              <TodoListItem key={it.id} item={it} actions={actions} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
