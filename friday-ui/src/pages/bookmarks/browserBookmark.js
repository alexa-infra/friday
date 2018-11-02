import React from 'react';


const getBookmarkScript = () => {
  return `javascript:(function(){
    var redirect = '${document.location.origin}/bookmarks/add?';
    var searchString = new URLSearchParams();
    searchString.append('title', document.title);
    searchString.append('url', document.location.href);
    redirect += searchString.toString();
    window.open(redirect, '_blank');
  })()`;
}

const BrowserBookmark = () => (
  <a href={getBookmarkScript()}>Bookmark</a>
);

export default BrowserBookmark;
