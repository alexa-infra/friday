import React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUpdateBookmarkMutation, useDeleteBookmarkMutation } from '../../api';

dayjs.extend(relativeTime);

const Bookmark = ({
  item: {title, url, domain, created, readed}, onEdit, onMarkRead, onDelete,
}) => {
  const createdDate = dayjs(created);
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
        <i title={createdDate.toISOString(true)}>{createdDate.fromNow()}</i>
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

export const BookmarkList = ({
  items, showEdit
}) => {
  const [updateItem,] = useUpdateBookmarkMutation();
  const [deleteItem,] = useDeleteBookmarkMutation();
  return (
    <div className="bookmarks pb-2">
      {items.map((it) => (
        <Bookmark
          key={it.id}
          item={it}
          onEdit={() => showEdit(it)}
          onMarkRead={() => updateItem({...it, readed: !it.readed})}
          onDelete={() => deleteItem(it)}
        />
      ))}
    </div>
  );
}

export default BookmarkList;
