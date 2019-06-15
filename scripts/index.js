'use strict';
/* global $, bookmarkList, bookmarks store, api */

// eslint-disable-next-line no-unused-vars
$(document).ready(function() {
  bookmarkList.bindEventListeners();

  // api.getBookmarks()
  //   .then((bookmarks) => {
  //     bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
  //     bookmarkList.render();
  //   })
  //   .catch(err => console.log(err.message));
});