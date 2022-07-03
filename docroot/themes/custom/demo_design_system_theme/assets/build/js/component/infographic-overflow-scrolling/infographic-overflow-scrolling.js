"use strict";

jQuery(document).ready(function ($) {
  var respTable = $(document).find('.js-scrollable-holder .image-parent-holder');
  $.fn.extend({
    scrollRight: function scrollRight() {
      return this[0].scrollWidth - (this[0].scrollLeft + this[0].clientWidth) + 1;
    }
  });

  function hasScrolbar(element) {
    return element.get(0).scrollWidth > element.width();
  }

  function addScrollable() {
    for (var i = 0; i < respTable.length; i++) {
      var elem = $(respTable[i]);

      if (hasScrolbar(elem)) {
        elem.parent('.js-scrollable-holder').addClass('scrollable');
      }
    }
  }

  function removeScrollable() {
    var elems = $('.scrollable');

    for (var i = 0; i < elems.length; i++) {
      var elem = $(elems[i]);

      if (!hasScrolbar(elem.children('.image-parent-holder'))) {
        elem.removeClass('scrollable');
      }
    }
  }

  function scrollShadower(e) {
    var target = $(e.target);
    var parent = target.parent();
    var scrollableContentType, contentW;
    var contentViewportW = target.width();

    if ($(target).find('.image-holder').length > 0) {
      scrollableContentType = '.js-picture-bg';
      contentW = $(target).find('.image-holder').width();
    } else {
      scrollableContentType = '.chart-container';
      contentW = $(target).find('.safety-chart').width();
    }

    var rightEdge = target.scrollLeft();

    if (rightEdge >= (contentW - contentViewportW) / 2) {
      $(target).closest(scrollableContentType).find('.after').addClass('before');
    } else {
      $(target).closest(scrollableContentType).find('.after').removeClass('before');
    }

    if (target.scrollLeft() > 0 && !parent.hasClass('scrolled')) {
      parent.addClass('scrolled');
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

    $(window).on('resize', function () {
      if ($(window).width() < 769) {
        addScrollable();
      } else {
        removeScrollable();
      }
    });
  })();

  $('.image-parent-holder').on('scroll', scrollShadower);
});
