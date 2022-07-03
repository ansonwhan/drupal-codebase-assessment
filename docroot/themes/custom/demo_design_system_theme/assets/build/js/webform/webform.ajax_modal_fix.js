"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.ajaxModalFormFix = {
    attach: function attach(context, settings) {
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
      }, 50);
    }
  };
})(jQuery, Drupal);
