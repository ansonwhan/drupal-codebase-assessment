/**
 * @file
 * functions for Bootstrap Modal.
 *
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.componentModal = {
    attach: function (context, settings) {
      $('.modal').once('componentModal').each(function () {
        if (!$('iframe, video', this)) {
          return false;
        }

        /**
         * Stopped video after close modal.
         */
        $(this).on('hidden.bs.modal', function (e) {
          $('iframe', this).attr('src', $('iframe', this).attr('src'));
        });

        /**
         * Refreshed blazy after open modal.
         */
        $(this).on('shown.bs.modal', function (e) {
          var bLazy = new Blazy();
        });
      });
    }
  };

})(jQuery, Drupal);
