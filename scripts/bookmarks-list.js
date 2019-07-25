/* global $, api, store */

const bookmarkList = (function() { 

  function createBookmarkElement(bookmark) {
    return `
      <li class="js-bookmark-element" data-id="${bookmark.id}">
        <span class="collapsed-bookmark">
          <div class="bookmark-toggle bookmark-title">${bookmark.title}</div>
          <div class="bookmark-rating">${bookmark.rating}</div>
          <span class="box" hidden>
            <div class="bookmark-url">
              <a href="${bookmark.url}" target="_blank">
                Visit Site
              </a>
            </div>
            <div class="bookmark-description">
              <p>${bookmark.desc}</p>
            </div>
            <button class="bookmark-element-delete" id="${bookmark.id}">Delete</button>
            <button class="bookmark-element-close" id="${bookmark.id}">Close</button>
          </span>
        </span>
      </li>
  `;
  }

  // line 13 link isnt opening unless right click on it 
  // line 20 the closing tag is delete on accident, but if changed to button, the expand no longer works; same thing happened with close button
  // tried to add a div around the buttons and that also broke the expanding of the bookmarks

  function handleBookmarkExpand() {
    $('ul.js-bookmark-list').on('click', '.js-bookmark-element', function(){
      if($(event.target).is('a')) {
        return;
      }
      event.preventDefault();
      let container = $(this).children()[0];
      let box = $(container).children();
      if($(box[box.length - 1]).prop('hidden')) {
        $(box[box.length - 1]).prop('hidden', false);
        $(box[box.length - 1]).slideDown('slow');
      } 
      // else {
      // as is currently written this closes the last opened element (or elements) before pressing a close button not the specific element the close button is in
      // $('.js-bookmark-element').on('click', '.bookmark-element-close', function() {
      //   event.preventDefault();
      //   $(box.lastChild).prop('hidden', true);
      //   $(box.lastChild).slideUp();
      // }); 
      // }
    });
  }

  function handleBookmarkClose() {
    $(document).on('click', '.bookmark-element-close', function(){
      event.preventDefault();
      let box =  $(this.parentElement);
      if(!$(box).prop('hidden')) {
        $(box).slideUp();
      }
    });
  }

  function handleFormExposed() {
    $('#add-bookmark').click(function() {
      if($('.js-adding-bookmark').is(':hidden')) {
        $('.js-adding-bookmark').slideDown('slow');
      }
    });
  }

  function handleFormClose() {
    $('#close-form').click(function() {
      if($('.js-adding-bookmark').is(':visible')) {
        $('.js-adding-bookmark').slideUp();
      }
    });
  }

  function createBookmarkItemString(bookmarkList) {
    const items = bookmarkList.map((bookmark) => createBookmarkElement(bookmark));
    return items.join('');
  }

  function createError(message) {
    return `
        <button id="close-error">X</button>
        <p>${message}</p>
    `;
  }

  function renderError() {
    if (store.error) {
      const genErr = createError(store.error);
      $('.error-container').html(genErr);
    } else {
      $('.error-container').empty();
    }
  }

  function handleCloseError() {
    $('.error-container').on('click', '#close-error', function() {
      store.setError(null);
      renderError();
    });
  }

  function render() {
    renderError();
    let bookmarks = [...store.bookmarks];
    // if(store.expandCheckedItem) {
    //   bookmarks = bookmarks.filter(item => !item.expanded);
    // }
    const bookmarkListString = createBookmarkItemString(bookmarks);
    console.log(bookmarkListString);
    $('.js-bookmark-list').html(bookmarkListString);
  }

  function handleCreateBookmarkSubmit() {
    $('#adding-bookmark-form').submit(function(event) {
      event.preventDefault();
      const newBookmark = $('.bookmark-title').val();
      if(newBookmark.trim() === '') {
        store.setError('Not a valid name');
        renderError();
        return;
      }
      const newBookmarkUrl = $('.bookmark-url').val();
      const newBookmarkDescription = $('.bookmark-description').val();
      const newBookmarkRating = $('input[name=\'rating\']:checked'). val();
      $('.bookmark-title').val('');
      $('.bookmark-url').val('');
      $('.bookmark-description').val('');
      api.createBookmark(newBookmark, newBookmarkUrl, newBookmarkDescription, newBookmarkRating) 
        .then((bookmarks) => {
          store.addBookmark(bookmarks);
          render();
        })
        .catch(err => {
          store.setError(err.message);
          renderError();
        });
      document.getElementById('1-star').checked = true;
    });
  }
  
  function handleDeleteClicked() {
    $('.js-bookmark-list').on('click','.bookmark-element-delete', event => {
      event.preventDefault();
      const id = event.currentTarget.id;
      api.deleteBookmark(id)
        .then(() => {
          store.findAndDelete(id);
          render();
        })
        .catch(err => {
          store.setError(`Unable to delete. ${err.message}`);
          render();
        });
    });
  }
  
  function handleFilter() {
    $('.min-rating-filter').on('change', event => {
      event.preventDefault();
      store.filterByMin($('.min-rating-filter').val());
      render();
    });
  }

  function bindEventListeners() {
    handleBookmarkExpand();
    handleBookmarkClose();
    handleFormExposed();
    handleFormClose();
    handleCreateBookmarkSubmit();
    handleDeleteClicked();
    handleFilter();
    handleCloseError();
  }
  
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());