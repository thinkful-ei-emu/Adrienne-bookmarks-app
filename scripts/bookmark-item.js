'use strict';
/* global cuid */

// eslint-disable-next-line no-unused-vars
const Bookmark = (function() {
  const validateName = function(name) {
    if(!name) throw new TypeError('Name must not be blank');
  };

  const create = function(title, rating, description) {
    return {
      id: cuid(),
      title,
      url,
      rating,
      description,
      expanded: false,
    };
  };
  return {
    validateName,
    create
  };
}());
