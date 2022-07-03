"use strict";

(function ($, Drupal, cookies) {
  'use strict';

  Drupal.behaviors.symptomsFormResults = {
    attach: function attach(context, settings) {
      var formUrl = cookies.get('questionarie-form-page');

      if (formUrl) {
        $('.symptom-questionnaire-views-block-header-elements-wrapper .btn-outline-secondary').attr('href', formUrl);
      }
    }
  };
})(jQuery, Drupal, window.Cookies);
