import React, { Component } from 'react'
import classNames from 'classnames'
import './bookmarks.css'


const Bookmark = ({id, title, url, domain, created, readed}) => (
  <div className="bookmark" key={id}>
    <div className="title">
      <a className={classNames({done: readed})} href={url}>{title}</a>
      <div className="site">
        (<a href={url}>{domain}</a>)
      </div>
    </div>
    <div className="controls">
      <i title={created.toISOString(true)}>{created.fromNow()}</i>
      <a>edit</a>
      <a>mark as read</a>
      <a>remove</a>
    </div>
  </div>
)

const BookmarksPage = ({items}) => (
  <div className="bookmarks-page">
    <div className="bookmarks">
      {items.map(it => (
        <Bookmark {...it} />
      ))}
    </div>
  </div>
)

export default BookmarksPage
