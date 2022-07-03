"use strict";

(function ($, Drupal, cookies) {
  'use strict';

  Drupal.behaviors.symptomsForm = {
    attach: function attach(context, settings) {
      $('.custom-form-symptom-inner .option', context).addClass('custom-control-label');
      var $progressWrapper = $('.webform-progress-tracker', context);
      $progressWrapper.once('webform-progress-bar-arrows').each(function () {
        $(this).append('<span class="custom-arrow custom-arrow-after"></span>').prepend('<span class="custom-arrow custom-arrow-before"></span>');
      });
      var step = $('[data-webform-key]', context).attr('data-webform-key');
      cookies.set('questionarie-form-page', window.location.href.substr(window.location.protocol.length + window.location.hostname.length + 2));

      if (step === 'page_break_1') {
        $('.custom-arrow-before', $progressWrapper).addClass('custom-arrow-disabled');
      } else if (step === 'page_break_4') {
        $('.custom-arrow-after', $progressWrapper).addClass('custom-arrow-disabled');
      }

      $('.custom-arrow-before', $progressWrapper).before().click(function (e) {
        if (!$(this).hasClass('custom-arrow-disabled')) {
          $('.webform-button--previous', context).trigger('click');
        }
      });
      $('.custom-arrow-after', $progressWrapper).after().click(function () {
        if (!$(this).hasClass('custom-arrow-disabled')) {
          $('.webform-button--next', context).trigger('click');
        }
      });
    }
  };
})(jQuery, Drupal, window.Cookies);
