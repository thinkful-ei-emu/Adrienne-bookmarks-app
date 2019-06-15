'use strict';

/* global $, api, store */

const bookmarkList = (function () { 

  function createBookmarkElement(bookmark) {

    function serializeJson(form) {
      const formData = new FormData(form);
      const obj = {};
      formData.forEach((val, name) => obj[name] = val);
      return JSON.stringify(obj);
    }
    
    $('#adding-bookmark-form').submit(event => {
      event.preventDefault();
      // These two lines are THE SAME
      let formElement = document.querySelector('#adding-bookmark-form');
      // let formElement = $('#adding-bookmark-form')[0];
      // the [0] here selects the native element
      console.log(serializeJson(formElement));

      render();
    });

    return `
    <li class="js-bookmark-element" data-item-id="${bookmark.id}">
      <span class="collapsed-bookmark">
        <div class="bookmark-toggle">${bookmark.title}</div>
        <div class="bookmark-rating">${bookmark.rating}</div>
        <span class="box">
        <div class="bookmark-url"> 
          <a href="${bookmark.url}">
            Visit site
          </a>
        </div>
        <div class="bookmark-description">
          ${bookmark.description}
        </div>
     </span>
       <button class="bookmark-element-delete">Delete</delete>
      </span>
    </li>
  `;
  }

  function handleBookmarkExpand() {
    $('#js-bookmark-list').on('click', '.bookmark-toggle', function(){
      if($('.box').is(':hidden')) {
        $('.box').slideDown('slow');
      } else {
        $('.box').slideUp();
      }
    });
  }

  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('item-id');
  }

  // this event listener makes the form slide down when add bookmark is clicked
  function handleFormExposed() {
    $('#add-bookmark').click(function() {
      if($('.js-adding-bookmark').is(':hidden')) {
        $('.js-adding-bookmark').slideDown('slow');
      } else {
        $('.js-adding-bookmark').slideUp();
      }
    });
  }

  function createBookmarkItemString(bookmarkList) {
    const items = bookmarkList.map((bookmark) => createBookmarkElement(bookmark));
    // console.log(items);
    return items.join('');
  }

  function render() {
    renderError();
    let bookmarks = [...store.bookmarks];
    if(store.expandCheckedItem) {
      bookmarks = bookmarks.filter(item => !item.expanded);
    }
    const bookmarkListString = createBookmarkItemString(bookmarks);

    $('#js-bookmark-list').html(bookmarkListString);
  }

  function createError(message) {
    return `
    <section class="error-message">
      <button id="close-error>X</button>
      <p>${message}</p>
    </section>
    `;
  }

  function renderError() {
    if (store.error) {
      const genErr = createError(store.error);
      $('.error-message').html(genErr);
    } else {
      $('.error-message').empty();
    }
  }

  // listens for create bookmark to be clicked; will hopefully submit form data and add data to the bookmarks list
  function handleCreateBookmarkSubmit() {
    $('#adding-bookmark-form').submit(function(event) {
      event.preventDefault();
      const newBookmark = $('.js-bookmark-entry').val();
      $('.js-bookmark-entry').val('');
      api.createBookmark(newBookmark)
        .then((bookmarks) => {
          store.addBookmark(bookmarks);
          render();
        })
        .catch(err => {
          store.setError(err.message);
          renderError();
        });
    });
  }
  
  function handleDeleteClicked() {
    $('.bookmark-element-delete').on('click', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      console.log(event.currentTarget);
      api.deleteBookmark(id)
        .then(() => {
          store.findAndDelete(id);
          render();
        })
        .catch(err => {
          console.log(err);
          store.setError(err.message);
          renderError();
        });
    });
  }

  function bindEventListeners() {
    handleBookmarkExpand();
    handleFormExposed();
    handleCreateBookmarkSubmit();
    handleDeleteClicked();
  }

  // this return is the wrong color; should be purple
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());