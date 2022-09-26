import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {
  selectList, getBookmarks, showEdit, markReadBookmark, deleteBookmark,
} from '../../features/bookmarks';

const Bookmark = ({
  item, onEdit, onMarkRead, onDelete,
}) => {
  const {
    title, url, domain, created, readed,
  } = item;
  return (
    <div className="bookmark border-solid border-b-2 border-gray-300 py-2">
      <div className="title">
        <a className={classNames('mr-2', { "line-through": readed })} href={url}>{title}</a>
        <div className="site text-gray-500 inline">
          (
          <a href={url}>{domain}</a>
          )
        </div>
      </div>
      <div className="controls">
        <i title={created.toISOString(true)}>{created.fromNow()}</i>
        <i className="mx-2">|</i>
        <button
          type="button"
          className="link-button"
          onClick={onEdit}
        >
          edit
        </button>
        <i className="mx-2">|</i>
        <button
          type="button"
          className="link-button"
          onClick={onMarkRead}
        >
          mark as read
        </button>
        <i className="mx-2">|</i>
        <button
          type="button"
          className="link-button"
          onClick={onDelete}
        >
          remove
        </button>
      </div>
    </div>
  );
};

let BookmarkList = ({
  items, showEdit, markRead, deleteItem,
}) => (
  <div className="bookmarks pb-2">
    {items.map((it) => (
      <Bookmark
        key={it.id}
        item={it}
        onEdit={() => showEdit(it)}
        onMarkRead={() => markRead(it)}
        onDelete={() => deleteItem(it)}
      />
    ))}
  </div>
);

BookmarkList = connect(
  (state) => ({
    items: selectList(state),
  }),
  (dispatch) => {
    const reload = () => dispatch(getBookmarks());
    return {
      showEdit: (item) => dispatch(showEdit(item)),
      markRead: (item) => dispatch(markReadBookmark(item)).then(reload),
      deleteItem: (item) => dispatch(deleteBookmark(item)).then(reload),
    };
  },
)(BookmarkList);

export default BookmarkList;
