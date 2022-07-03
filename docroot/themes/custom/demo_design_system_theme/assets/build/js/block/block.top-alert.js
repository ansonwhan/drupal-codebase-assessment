"use strict";

(function ($, Drupal, cookies) {
  Drupal.behaviors.topAlert = {
    attach: function attach(context, settings) {
      if (context !== document) {
        return;
      }

      $('.custom-top-alert.cookie-sensitive', context).once('topAlert').each(function () {
        var cookieModal = $('#block-simplepopupblock');

        if (cookies.get('top-alert-visibility') !== '1') {
          $(this).addClass('show');
          cookieModal.modal('show');
        }

        $('.close', this).click(function () {
          cookies.set('top-alert-visibility', 1);
        });
        cookieModal.on('hide.bs.modal', function () {
          cookies.set('top-alert-visibility', 1);
        });
      });
    }
  };
})(jQuery, Drupal, window.Cookies);
