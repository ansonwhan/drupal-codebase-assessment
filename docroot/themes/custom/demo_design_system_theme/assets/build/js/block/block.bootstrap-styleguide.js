"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.bootstrap_demo = {
    attach: function attach(context, settings) {
      $('[data-toggle="popover"]').popover();
      $('[data-toggle="tooltip"]').tooltip();
      $('#hljs-theme-toggler').click(function () {
        var m = $('#hljs-theme').attr('media');
        m = 'none' == m ? '' : 'none';
        $('#hljs-theme').attr('media', m);
      });
      $('#popover-toggler').click();
      hljs.initHighlightingOnLoad();
    }
  };
})(jQuery, Drupal);
