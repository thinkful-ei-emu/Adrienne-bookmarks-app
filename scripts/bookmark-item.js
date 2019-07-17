/* global cuid */

// eslint-disable-next-line no-unused-vars
const Bookmark = (function() {
  const validateName = function(name) {
    if(!name) throw new TypeError('Name must not be blank');
  };

  const validateUrl = function(url) {
    if(!url) throw new TypeError('URL must be full URL and is required');
  };

  const create = function(title, url, rating, description) {
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
    validateUrl,
    create
  };
}());