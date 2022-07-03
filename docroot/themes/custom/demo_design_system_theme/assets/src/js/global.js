/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.otsukaDesignSystem = {
    attach: function (context, settings) {
      $('.modal')
          .on('show.bs.modal', function () {
            console.log('modal opened');
            $('html', context).addClass('js--modal-open');
          })
          .on('hide.bs.modal', function () {
            console.log('modal hidden');
            $('html', context).removeClass('js--modal-open');
          })
    }
  };

})(jQuery, Drupal);
