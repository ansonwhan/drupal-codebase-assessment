/**
 * @file
 * functions for addtoany customizations.
 *
 */
(function ($, Drupal) {
  'use strict';
  
  Drupal.behaviors.odsAddToAny = {
    attach: function (context, settings) {
      var $links = $('.addtoany_list > a', context);
      $links.each(function () {
        $(this).removeAttr('target').unbind('click').attr('onclick', 'Drupal.behaviors.odsAddToAny.otsukaHandleAddToAnyShareClick(event)');
      });
    },
  
    otsukaHandleAddToAnyShareClick: function (event) {
      var target = event.currentTarget;
      var href = target.getAttribute('href');
      // preventDefault for all links that don't start with `mailto`
      if (href.match(/^mailto/) === null) {
        event.preventDefault();
      }
    }
  };
  
})(jQuery, Drupal);
