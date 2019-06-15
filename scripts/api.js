'use strict';
/* global $ */

let api = (function () {
  // put in my name for right now like says at top of API page, but might need to change
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Adrienne/bookmarks';

  // let listApiFetch = function(...args) {
  //   let error;
  //   return fetch(...args)
  //     .then(res => {
  //       if (!res.ok) {
  //         error = {code: res.status};
  //         if (!res.headers.get('content-type').includes('json')) {
  //           error.message = res.statusText;
  //           return Promise.reject(error);
  //         }
  //       }
  //       return res.json();
  //     })
  //     .then(data => {
  //       if (error) {
  //         error.message = data.message;
  //         return Promise.reject(error);
  //       }
  //       return data;
  //     });
  // };

  // function for getting bookmarks
  const getBookmarks = function() {
    return fetch(`${BASE_URL}`);
  };

  // function for creating bookmark
  const createBookmark = function(title, url, description, rating) {
    let newBookmark = JSON.stringify({
      // should be linking with form fields and is not
      title,
      url,
      description,
      rating
    });
    return fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newBookmark
    });
  };


  // function for deleting bookmark
  const deleteBookmark = function(id) {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });
  };

  // return above functions inside an object
  return {
    getBookmarks,
    createBookmark,
    deleteBookmark
  };
}());
