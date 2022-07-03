/**
 * @file
 */

jQuery(document).ready(function($) {
  /*PI tables scroll*/
  const respTable = $(document).find('.js-scrollable-holder .image-parent-holder');
  //console.log('responsive table: ', respTable);
  $.fn.extend({
    scrollRight: function() {
      return this[0].scrollWidth - (this[0].scrollLeft + this[0].clientWidth) + 1;
    }
  });

  function hasScrolbar(element) {
    return element.get(0).scrollWidth > element.width();
  }

  function addScrollable() {
    for (let i = 0; i < respTable.length; i++) {
      const elem = $(respTable[i]);
      if (hasScrolbar(elem)) {
        elem.parent('.js-scrollable-holder').addClass('scrollable');
      }
    }
  }

  function removeScrollable() {
    const elems = $('.scrollable');
    for (let i = 0; i < elems.length; i++) {
      const elem = $(elems[i]);
      if (!hasScrolbar(elem.children('.image-parent-holder'))) {
        elem.removeClass('scrollable');
      }
    }
  }

  function scrollShadower(e) {
    const target = $(e.target);
    const parent = target.parent();

    // Detect scrollbar position and assign class to show scroll arrow indicator in opposite direction when more than half of embedded content is shown.
    let scrollableContentType, contentW;
    const contentViewportW = target.width();
    if ($(target).find('.image-holder').length > 0) {
      scrollableContentType = '.js-picture-bg';
      contentW = $(target).find('.image-holder').width();
    } else {
      scrollableContentType = '.chart-container';
      contentW = $(target).find('.safety-chart').width();
    }
    const rightEdge = target.scrollLeft();
    if (rightEdge >= ((contentW - contentViewportW) / 2)) {
      $(target).closest(scrollableContentType).find('.after').addClass('before');
    } else {
      $(target).closest(scrollableContentType).find('.after').removeClass('before');
    }

    if (target.scrollLeft() > 0 && !parent.hasClass('scrolled')) {
      parent.addClass('scrolled');
      //console.log('event tag triggering for swipe to view more event: ', target);
      $(window).trigger('swipetoviewmore');
    } else if (target.scrollRight() < 2 && !parent.hasClass('scrolled-end')) {
      parent.addClass('scrolled-end');
    } else if (target.scrollLeft() <= 0 && parent.hasClass('scrolled')) {
      parent.removeClass('scrolled');
    } else if (target.scrollRight() >= 2 && parent.hasClass('scrolled-end')) {
      parent.removeClass('scrolled-end');
    }

  }

  (function addRemoveScrollableFunctions() {
    if ($(window).width() < 769) {
      addScrollable();
    } else {
      removeScrollable();
    }
    $(window).on('resize', function() {
      if ($(window).width() < 769) {
        addScrollable();
      } else {
        removeScrollable();
      }
    });
  }());

  $('.image-parent-holder').on('scroll', scrollShadower);
});
