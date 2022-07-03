(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.otsukaAnalytics = {
    attach: function (context, settings) {
      var $body = $('body', context);

      if (!$body.length) {
        return;
      }

      var setAnalyticsAttr = function ($target, attribute, value) {
        $target.once('data-analytics-position-attribute-set').each(function () {
          if (!$(this).attr(attribute)) {
            $(this).attr(attribute, value);
          }
        });
      };

      var $header = $('#section-header', $body);
      var $headerTarget = $('a, button, .custom--analytics-marker', $header);

      setAnalyticsAttr($headerTarget, 'data-analytics-position', 'Header');

      var $overlay = $('.modal', $body);
      var $overlayTarget = $('a, button, .custom--analytics-marker', $overlay);

      setAnalyticsAttr($overlayTarget, 'data-analytics-position', 'Overlay');

      var $cookieBanner = $('#section-footer', $body);
      var $cookieBannerTarget = $('.agree-button', $cookieBanner).addClass('analytics--o-cookie-accept');
      var $cookieBannerTarget1 = $('.decline-button', $cookieBanner).addClass('analytics--o-cookie-reject');

      setAnalyticsAttr($cookieBannerTarget, 'data-analytics-id', 'cookie-a');
      setAnalyticsAttr($cookieBannerTarget1, 'data-analytics-id', 'cookie-r');

      var $hero = $('.custom--hero-spot', $body);
      var $heroTarget = $('a, button, .custom--analytics-marker', $hero);

      setAnalyticsAttr($heroTarget, 'data-analytics-position', 'Hero Spot');

      var $isi = $('.inline-isi-wrapper, .isi-tray', $body);
      var $isiTarget = $('a, button, .custom--analytics-marker', $isi);

      setAnalyticsAttr($isiTarget, 'data-analytics-position', 'ISI');

      var $main = $('#main-content', $body);
      var $mainTarget = $('a, button, .custom--analytics-marker', $main);

      setAnalyticsAttr($mainTarget, 'data-analytics-position', 'Body');

      var $footer = $('#section-footer', $body);
      var $footerTarget = $('a, button, .custom--analytics-marker', $footer);

      setAnalyticsAttr($footerTarget, 'data-analytics-position', 'Footer');

      // References.
      $('.analytics--p-reference-expand', context).once('analytics--p-reference-expand').click(function() {
        $(this).toggleClass('analytics--p-reference-expand').toggleClass('analytics--p-reference-collapse');
      });

      // Directory.
      $('.block-views-blockdirectory-block-1 a', context).once('analytics--directory-view').each(function() {
        $(this).addClass('analytics--p-text-link');

        if (!$(this).attr('data-analytics-id')) {
          var id = 'directory-link-' + $(this).attr('href') + $(this).html() + $(this).attr('class');
          $(this).attr('data-analytics-id', String(CryptoJS.MD5(id)).slice(-5));
        }
      });

      // Video.
      $('video', context).once('analytics--v-click').each(function() {
        var $_self = $(this);
        $(this).addClass('analytics--v-click');
        var src = $('source', $_self).attr('src');
        $(this).attr('data-analytics-video-name', src);
        var videoId = String(CryptoJS.MD5(src)).slice(-5);
        $(this).attr('data-analytics-id', videoId);
      });

      // Form.
      $(document).bind('DOMNodeInserted DOMNodeRemoved', function (element) {
        var $target = $(element.target);
        if ($target.hasClass('webform-ajax-form-wrapper')) {
          var $form = $('form', $target)
          var $alert = $('.alert-wrapper', $target);

          var optionTexts = [];
          var text = $('.item-list__comma-list li a', $alert).each(function () {
            optionTexts.push($(this).text())
          });
          text = optionTexts.join(', ');

          $alert.attr('data-analytics-form-name', $form.attr('data-analytics-form-name'))
              .attr('data-analytics-form-error', text)
              .addClass('analytics--f-error');
        }

      });

      // Forms.
      var setFormAttributes = function ($form) {
        var $block = $form.closest('.block');
        var formName = 'form--' + $block.attr('id');
        $form.addClass('analytics--f-' + formName);

        if (!$form.attr("data-analytics-form-name")) {
          $form.attr('data-analytics-form-name', formName);
        }

        $('input, select, textarea', $form).once('webform--input' + formName).each(function() {
          $(this).addClass('analytics--f-' + $(this).attr('name'));

          if (!$(this).hasClass('form-submit')) {
            $(this).addClass('analytics--f-question');
          }

          if (!$(this).attr("data-analytics-form-name")) {
            $(this).attr('data-analytics-form-name', formName);
          }

          if (!$(this).attr("data-analytics-form-field")) {
            $(this).attr('data-analytics-form-field', $(this).attr('name'));
          }
        });
        $(':submit', $form).addClass('analytics--f-submit');
      };

      // Form ajax.
      $(document).bind('DOMNodeInserted DOMNodeRemoved', function (element) {
        var $target = $(element.target);
        if ($target.hasClass('webform-ajax-form-wrapper') || $target.hasClass('block-webform-block')) {
          var $form = $('form', $target)
          setFormAttributes($form);

          $('#drupal-modal').on('dialogopen', function(event) {
            var $uiDialog = $(this).closest('.ui-dialog');
            $('.ui-dialog-titlebar .ui-dialog-titlebar-close', $uiDialog).addClass('analytics--o-form-close')
                .attr('data-analytics-id', 'uim01')
                .attr('data-analytics-position', 'Overlay');
          });
        }

      });

      // Form static.
      $('form', context).once('webform--form').each(function() {
        var $form = $(this);
        setFormAttributes($form);
      });

    }
  };
})
(jQuery, Drupal);
