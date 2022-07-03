/**
 * @file
 * Ajax modal form fix.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.ajaxModalFormFix = {
    attach: function (context, settings) {
      setTimeout(function() {
        window.dispatchEvent(new Event('resize'));
      }, 50);
    }
  };

})(jQuery, Drupal);
