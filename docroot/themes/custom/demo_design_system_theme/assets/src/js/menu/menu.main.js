/**
 * @file
 * Main menu utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.otsukaMenuMain = {
    attach: function (context, settings) {

      var $mainMenuBlock = $('#navbarTogglerblock-otsuka-design-system-theme-main-menu-menu', context);

      $mainMenuBlock.once('menu-main-collapse').on('hidden.bs.collapse', function () {
        $('body').addClass('js--menu-main-collapsed').removeClass('js--menu-main-expanded');
      });

      $mainMenuBlock.once('menu-main-expand').on('shown.bs.collapse', function () {
        $('body').addClass('js--menu-main-expanded').removeClass('js--menu-main-collapsed');
      });

    }
  };

})(jQuery, Drupal);
