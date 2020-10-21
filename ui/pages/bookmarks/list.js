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
    <div className="row bookmark p-1">
      <div className="col d-flex flex-column flex-nowrap">
        <div className="title d-flex flex-row flex-wrap">
          <a className={classNames('mr-1', { done: readed })} href={url}>{title}</a>
          <div className="site">
            (
            <a href={url}>{domain}</a>
            )
          </div>
        </div>
        <div className="controls">
          <i title={created.toISOString(true)}>{created.fromNow()}</i>
          <button
            type="button"
            className="link-button"
            onClick={onEdit}
          >
            edit
          </button>
          <button
            type="button"
            className="link-button"
            onClick={onMarkRead}
          >
            mark as read
          </button>
          <button
            type="button"
            className="link-button"
            onClick={onDelete}
          >
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

let BookmarkList = ({
  items, showEdit, markRead, deleteItem,
}) => (
  <div className="bookmarks row justify-content-center">
    <div className="col col-md-8">
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
