jQuery(document).ready(function($) {
  (function makeRadioWithTextInputRequired() {
    const parentDiv = $('.radio-inputs-with-text-input');

    parentDiv.find('input[type=radio]').change(function() {
      if ($('.js-validation').is(':checked')) {
        parentDiv.find('input[type=text]').attr("required", true);
      } else {
        parentDiv.find('input[type=text]').attr("required", false);
      }
    });
  })();
});
