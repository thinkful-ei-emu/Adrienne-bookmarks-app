'use strict';

let api = (function () {
  // put in my name for right now like says at top of API page, but might need to change
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Adrienne';

  // function for getting bookmarks
  const getBookmarks = function() {
    return fetch(`${BASE_URL}/bookmarks`);
  };

  // function for creating bookmark
  const createBookmark = function() {
    let newBookmark = JSON.stringify({
      // why is name ok but rest of properties in object are not?
      name,
      url,
      rating,
      description
    });
    return fetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newBookmark
    });
  };

  // function for editing bookmark
  const editBookmark = function(id, updateData) {
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'PATCH',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
  };

  // function for deleting bookmark
  const deleteBookmark = function(id) {
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE'
    });
  };

  // return above functions inside an object
  return {
    getBookmarks,
    createBookmark,
    editBookmark,
    deleteBookmark
  };
}());