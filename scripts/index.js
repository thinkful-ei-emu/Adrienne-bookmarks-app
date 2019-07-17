/* global $, bookmarkList, bookmarks store, api */

// eslint-disable-next-line no-unused-vars
$(document).ready(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((item) => store.addBookmark(item));
      bookmarkList.render();
    });
});