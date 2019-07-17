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

  const filterByMin = function(filter) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.rating >= filter);
  };

  return {
    bookmarks: [],
    setError,
    error: '',
    addBookmark,
    adding: false,
    findById,
    findAndDelete,
    filterByMin,
    filtering: true,
  };
}());