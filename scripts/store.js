'use strict';
/**
  * Mapped Out State Object for Opening page
  * 
  * {bookmarks:[], adding: false, filtering: false}
  * 
*/

/**
  * Mapped Out State Object for Adding New Bookmark and Error Handling
  * 
  * {bookmarks: [...], adding: true, filtering: false, error: 'error message'}
  * 
*/

/**
  * Mapped out state object for Expanding Bookmark
  * 
  * { bookmarks: [{id: 1, title: 'Bookmark 1', rating: 3, expanded: true, editing: false}], 
  * adding: false, filtering: false}
  * 
*/

/**
  * Mapped out state object for Editing Bookmark
  * 
  * {bookmarks: [{id: 1, title: 'Bookmark 1', rating: 3, expanded: false, editing: true},
  * adding: false, filtering: false]}
  * 
 */

/**
  * Mapped out state object for Deleting Bookmark
  * 
  * {bookmarks: [], adding: false, editing: false }
  * 
*/

/**
  * Mapped out state object for Rating Filter
  * 
  * {bookmarks: [{id: 1, title: 'Bookmark 1', rating: 3, expanded: false},
  * {id: 4, title: 'Bookmark 4', rating: 3, expanded: false}], 
  * adding: false, filtering: 3}
  * 
*/