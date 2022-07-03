/**
 * @file
 * This script fixes following issue of Bootstrap External Link Popup Module. Once its solution available, need to disable this script
 * https://www.drupal.org/project/bootstrap_external_link_popup/issues/3200946
 */

(function ($, Drupal, drupalSettings) {
  'use strict';
  
  // Replace openDialog function from the external_link_popup module.
  Drupal.behaviors.externalLinkPopup.openDialog = function (element, settings, className) {
    // Take care about tokens.
    var url = $(element).attr('href');
    var text = $(element).text();
    var bodyHtml = settings.body
      .replace('[link:url]', this.htmlEncode(url))
      .replace('[link:text]', this.htmlEncode(text));
    
    $('#externalLinkPopupModalLabel').html(settings.title);
    $('#externalLinkPopupModalCloseButton').html(settings.labelno);
    $('#externalLinkPopupModalContinueButton').html(settings.labelyes);
    $('#externalLinkPopupModalContinueButton').unbind('click').bind('click',function () {
      var target = window.open(element.href, element.target, 'noopener');
      $('.modal-content').find('.close').trigger('click');
    });
    $('#externalLinkPopupModalBody').html(bodyHtml);
    $('#externalLinkPopupModal').modal();
  };
  
})(jQuery, Drupal, drupalSettings);
