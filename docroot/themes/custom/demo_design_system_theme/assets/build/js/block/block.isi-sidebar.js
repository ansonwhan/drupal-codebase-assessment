"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.ISISidebar = {
    attach: function attach(context, settings) {
      function initTrayScroll() {
        $('.inline-isi-scrollable', context).once('initTrayScrollSidebar').scrollbar({
          autoScrollSize: false,
          scrolly: $('.inline-external-scroll-y', context)
        });
      }

      initTrayScroll();
      $(window).once('initScrollSidebarUpdate').on('scroll resize', function () {
        initTrayScroll();
      });
    }
  };
})(jQuery, Drupal);
