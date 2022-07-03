/**
 * @file
 * ISISidebar utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.ISISidebar = {
    attach: function (context, settings) {

      function initTrayScroll() {
        $('.inline-isi-scrollable', context).once('initTrayScrollSidebar').scrollbar({
          autoScrollSize: false,
          scrolly: $('.inline-external-scroll-y', context)
        });
      }

      initTrayScroll();

      // Minimize tray on scroll event
      $(window).once('initScrollSidebarUpdate').on(
          'scroll resize',
          function () {
            initTrayScroll();
          }
      );

    }
  };

})(jQuery, Drupal);
