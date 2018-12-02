import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bookmarks } from '../../actions';


const Bookmark = ({item, onEdit, onMarkRead, onDelete}) => {
  const { title, url, domain, created, readed } = item;
  return (
    <div className="bookmark">
      <div className="title">
        <a className={classNames({done: readed})} href={url}>{title}</a>
        <div className="site">
          (<a href={url}>{domain}</a>)
        </div>
      </div>
      <div className="controls">
        <i title={created.toISOString(true)}>{created.fromNow()}</i>
        <button
          type="button"
          className="link-button"
          onClick={onEdit}>
            edit
        </button>
        <button
          type="button"
          className="link-button"
          onClick={onMarkRead}>
            mark as read
        </button>
        <button
          type="button"
          className="link-button"
          onClick={onDelete}>
            remove
        </button>
      </div>
    </div>
  );
}

let BookmarkList = ({items, showEdit, markRead, deleteItem}) => (
  <div className="bookmarks">
    {items.map(it => (
      <Bookmark key={it.id}
                item={it}
                onEdit={() => showEdit(it)}
                onMarkRead={() => markRead(it)}
                onDelete={() => deleteItem(it)} />
    ))}
  </div>
);

BookmarkList = connect(
  state => state.bookmarks,
  dispatch => {
    const reloadBookmarks = () => dispatch(bookmarks.getBookmarks());
    return {
      showEdit: item => dispatch(bookmarks.showEdit(item)),
      markRead: item => dispatch(bookmarks.markReadBookmark(item)).then(reloadBookmarks),
      deleteItem: item => dispatch(bookmarks.deleteBookmark(item)).then(reloadBookmarks),
    };
  }
)(BookmarkList);

export default BookmarkList;
