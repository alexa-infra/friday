import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalFooter } from '../../components/modal';
import Button from '../../components/button';
import {
  selectList,
  getTodoList,
  selectCreateItem,
  selectEditItem,
  showCreateTodo,
  showEditTodo,
  hideCreateTodo,
  hideEditTodo,
  createTodoItem,
  markDone,
  markFocus,
  markDeleted,
  changeTodoItem,
  removeTodoItem,
} from '../../features/todo';


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

const NewTodoDialogBase = props => {
  const {
    open: show, onHide, onSubmit, item: data, error
  } = props;
  return (
    <Modal isOpen={show} onRequestClose={onHide} >
      <Form
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={data}
      >
        {({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ModalHeader onClose={onHide}>New TODO</ModalHeader>

            {error && (
              <i>{error.message}</i>
            )}
            <FormFields />

            <ModalFooter>
              <Button
                type="submit"
                disabled={submitting || pristine}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        )}
      </Form>
    </Modal>
  );
};

const NewTodoDialog = connect(
  selectCreateItem,
  dispatch => ({
    onHide: () => dispatch(hideCreateTodo()),
    onSubmit: data => dispatch(createTodoItem(data)),
  })
)(NewTodoDialogBase);

const EditTodoDialogBase = props => {
  const {
    open: show, onHide, onSubmit, item: data, error
  } = props;
  return (
    <Modal isOpen={show} onRequestClose={onHide}>
      <Form
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={data}
      >
        {({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <ModalHeader onClose={onHide}>Edit TODO</ModalHeader>

            {error && (
              <i>{error.message}</i>
            )}
            <FormFields />

            <ModalFooter>
              <Button
                type="submit"
                disabled={submitting || pristine}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        )}
      </Form>
    </Modal>
  );
};

const EditTodoDialog = connect(
  selectEditItem,
  dispatch => ({
    onHide: () => dispatch(hideEditTodo()),
    onSubmit: data => dispatch(changeTodoItem(data)),
  })
)(EditTodoDialogBase);

const TodoListItem = ({item, actions}) => (
  <div className="todo-list-item">
    <div className="btn-flat" onClick={() => actions.onDone(item)}>
     <i className={classNames('far', {
       'fa-check-square': item.done,
       'fa-square': !item.done,
     })} />
    </div>
    <div className="btn-flat" onClick={() => actions.onFocus(item)}>
      <i className={classNames("fa-star", {
        "fas": item.focus,
        "far": !item.focus,
      })} />
    </div>
    <div className="btn-flat" onClick={() => actions.onEdit(item)}>
      <i className="far fa-file" />
    </div >
    <span className="todo-title">
      {item.name}
      {item.folder ? (
        <div className="btn-flat" onClick={() => actions.onOpen(item)}>
          <i className="far fa-folder" />
        </div>
      ) : (
        null
      )}
    </span>
    {!item.done ? (
      <div className="btn-flat" onClick={() => actions.onMarkDelete(item)}>
        <i className={classNames({
          'far fa-trash-alt': !item.deleted,
          'fas fa-trash-restore': item.deleted,
        })} />
      </div>
    ) : (
      <div className="btn-flat" onClick={() => actions.onDone(item)}>
        <i className="fas fa-trash-restore" />
      </div>
    )}
    {(item.done || item.deleted) && (
      <div className="btn-flat" onClick={() => actions.onDelete(item)}>
        <i className="fas fa-times" />
      </div>
    )}
  </div>
);

const TodoListBase = ({ list, items, doneItems, onLoad, onShowNew, actions }) => {
  useEffect(() => {
    onLoad('root');
  }, []);
  const onShowNewItem = () => onShowNew(list.id);
  return (
    <div className="todo-page md:w-8/12 md:mx-auto">
      <NewTodoDialog />
      <EditTodoDialog />
      <div className="my-2">
        <Button onClick={onShowNewItem}>
          <i className="fa fa-plus" />
        </Button>
        {list.is_root === undefined && (
          <Button onClick={() => onLoad(list.parent_id ?? 'root')}>
            <i className="fas fa-level-up-alt" />
          </Button>
        )}
        <Button
          isActive={list.is_root === true && list.name === "root"}
          onClick={() => onLoad('root')}
        >
          Root
        </Button>
        <Button
          isActive={list.is_root === true && list.name === "trash"}
          onClick={() => onLoad('trash')}
        >
          Trash
        </Button>
        <Button
          isActive={list.is_root === true && list.name === "focus"}
          onClick={() => onLoad('focus')}
        >
          Focus
        </Button>
      </div>
      {items.length > 0 && (
        <div className="todo-list">
          {items.map(it => (
            <TodoListItem key={it.id} item={it} actions={actions} />
          ))}
        </div>
      )}
      {doneItems.length > 0 && (
        <>
          <h2>Inactive</h2>
          <div className="todo-list">
            {doneItems.map(it => (
              <TodoListItem key={it.id} item={it} actions={actions} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const defaultTodo = {
  done: false,
  focus: false,
  deleted: false,
  folder: false,
  order: 0,
  dueto: null,
};

const TodoList = connect(
  selectList,
  dispatch => ({
    onLoad: listid => dispatch(getTodoList(listid)),
    onShowNew: listid => dispatch(showCreateTodo({ parent_id: listid, ...defaultTodo })),
    actions: {
      onDone: item => dispatch(markDone(item)),
      onFocus: item => dispatch(markFocus(item)),
      onMarkDelete: item => dispatch(markDeleted(item)),
      onEdit: item => dispatch(showEditTodo(item)),
      onOpen: item => dispatch(getTodoList(item.id)),
      onDelete: item => dispatch(removeTodoItem(item)),
    }
  })
)(TodoListBase);

export { NewTodoDialog, TodoList };
