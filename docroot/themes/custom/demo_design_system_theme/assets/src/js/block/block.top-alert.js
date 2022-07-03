/**
 * @file
 * Block top alert functions.
 *
 */
(function ($, Drupal, cookies) {

  Drupal.behaviors.topAlert = {
    attach: function (context, settings) {
      if (context !== document) {
        return;
      }
      $('.custom-top-alert.cookie-sensitive', context).once('topAlert').each(function () {
        let cookieModal = $('#block-simplepopupblock');
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
