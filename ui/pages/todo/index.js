import React, { useEffect } from 'react';
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
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
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <Field name="name" component="input" type="text" />
    </div>
    <div className="form-group">
      <label htmlFor="description">Description</label>
      <Field name="description" component="textarea" />
    </div>
    <div className="form-group">
      <label htmlFor="order">Order</label>
      <Field name="order" component="input" type="number" />
    </div>
    <div className="form-group">
      <label htmlFor="dueto">Due to</label>
      <Field name="dueto" component="input" type="date" />
    </div>
    <div className="form-check">
      <Field name="done" component="input" type="checkbox" />
      <label htmlFor="done">Done</label>
    </div>
    <div className="form-check">
      <Field name="focus" component="input" type="checkbox" />
      <label htmlFor="focus">Focus</label>
    </div>
    <div className="form-check">
      <Field name="folder" component="input" type="checkbox" />
      <label htmlFor="folder">Folder</label>
    </div>
  </>
);

const NewTodoDialogBase = props => {
  const {
    open: show, onHide, onSubmit, item: data, error
  } = props;
  return (
    <Modal show={show} onHide={onHide}>
      <Form
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={data}
      >
        {({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>New TODO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {error && (
                <i>{error.message}</i>
              )}
              <FormFields />
            </Modal.Body>
            <Modal.Footer>
              <button
                type="submit"
                disabled={submitting || pristine}
              >
                Save
              </button>
            </Modal.Footer>
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
    <Modal show={show} onHide={onHide}>
      <Form
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={data}
      >
        {({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit TODO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {error && (
                <i>{error.message}</i>
              )}
              <FormFields />
            </Modal.Body>
            <Modal.Footer>
              <button
                type="submit"
                disabled={submitting || pristine}
              >
                Save
              </button>
            </Modal.Footer>
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
    <div className="todo-page">
      <NewTodoDialog />
      <EditTodoDialog />
      <div className="">
        <div className="btn" onClick={onShowNewItem}>
          <i className="fa fa-plus" />
        </div>
        {list.is_root === undefined && (
          <div className="btn-flat" onClick={() => onLoad(list.parent_id ?? 'root')}>
            <i className="fas fa-level-up-alt" />
          </div>
        )}
        <div className={classNames("btn", {
            "btn-primary": list.is_root === true && list.name === "root"
          })} onClick={() => onLoad('root')}>
          Root
        </div>
        <div className={classNames("btn", {
            "btn-primary": list.is_root === true && list.name === "trash"
          })} onClick={() => onLoad('trash')}>
          Trash
        </div>
        <div className={classNames("btn", {
            "btn-primary": list.is_root === true && list.name === "focus"
          })} onClick={() => onLoad('focus')}>
          Focus
        </div>
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
