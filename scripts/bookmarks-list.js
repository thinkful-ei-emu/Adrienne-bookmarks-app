/* global $, api, store */

const bookmarkList = (function() { 

  function createBookmarkElement(bookmark) {
    return `
    <li class="js-bookmark-element" data-id="${bookmark.id}">
      <span class="collapsed-bookmark col-4">
        <div class="bookmark-toggle bookmark-title">${bookmark.title}</div>
        <div class="bookmark-rating">${bookmark.rating} Stars</div>
        <span class="box" hidden>
          <div class="bookmark-url"> 
            <a href="${bookmark.url}">
              Visit site
            </a>
          </div>
          <div class="bookmark-description">
            ${bookmark.desc}
          </div>
          <button class="bookmark-element-delete" id="${bookmark.id}">Delete</delete>
        </span>
      </span>
    </li>
  `;
  }

  function handleBookmarkExpand() {
    $(document).on('click', '.js-bookmark-element', function(){
      event.preventDefault();
      let box = $(this).children()[0];
      if($(box.lastChild).prop('hidden')) {
        $(box.lastChild).prop('hidden', false);
        $(box.lastChild).slideDown('slow');
      } else {
        $(box.lastChild).prop('hidden', true);
        $(box.lastChild).slideUp();
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
    if(store.expandCheckedItem) {
      bookmarks = bookmarks.filter(item => !item.expanded);
    }
    const bookmarkListString = createBookmarkItemString(bookmarks);

    $('.js-bookmark-list').html(bookmarkListString);
  }

  function handleCreateBookmarkSubmit() {
    $('#adding-bookmark-form').submit(function(event) {
      event.preventDefault();
      const newBookmark = $('.bookmark-title').val();
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