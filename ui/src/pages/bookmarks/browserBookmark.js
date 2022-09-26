import React from 'react';

const bookmarkScript = `javascript:(function(){
    var redirect = '${document.location.origin}/bookmarks/add?';
    var searchString = new URLSearchParams();
    searchString.append('title', document.title);
    searchString.append('url', document.location.href);
    redirect += searchString.toString();
    window.open(redirect, '_blank');
  })()`;

const bookmarkHtml = `<a href="${bookmarkScript}">Bookmark</a>`;

const createMarkup = (html) => ({ __html: html });

const BrowserBookmark = () => (
  <div dangerouslySetInnerHTML={createMarkup(bookmarkHtml)} />
);

export default BrowserBookmark;
