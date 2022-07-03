"use strict";

(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.externalLinkPopup.openDialog = function (element, settings, className) {
    var url = $(element).attr('href');
    var text = $(element).text();
    var bodyHtml = settings.body.replace('[link:url]', this.htmlEncode(url)).replace('[link:text]', this.htmlEncode(text));
    $('#externalLinkPopupModalLabel').html(settings.title);
    $('#externalLinkPopupModalCloseButton').html(settings.labelno);
    $('#externalLinkPopupModalContinueButton').html(settings.labelyes);
    $('#externalLinkPopupModalContinueButton').unbind('click').bind('click', function () {
      var target = window.open(element.href, element.target, 'noopener');
      $('.modal-content').find('.close').trigger('click');
    });
    $('#externalLinkPopupModalBody').html(bodyHtml);
    $('#externalLinkPopupModal').modal();
  };
})(jQuery, Drupal, drupalSettings);
