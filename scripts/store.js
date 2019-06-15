'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function() {
  const setError = function(error) {
    this.error = error;
  };

  const addBookmark = function(item) {
    this.bookmarks.push(item);
  };

  const findById = function(id) {
    return this.bookmarks.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const filterByMin = function() {
    // code to make the filter selector work
  };

  const toggleExpandedView = function() {
    this.expandCheckedItem = !this.expandCheckedItem;
  };

  return {
    bookmarks: [],
    setError,
    error: null,
    addBookmark,
    adding: false,
    findById,
    findAndDelete,
    filterByMin,
    filtering: true,
    toggleExpandedView,
    expandCheckedItem: false
  };
}());