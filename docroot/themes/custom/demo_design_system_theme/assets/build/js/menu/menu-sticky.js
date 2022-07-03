"use strict";

(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.otsukaStickyHeader = {
    attach: function attach(context, settings) {
      var $mainHeader = $('header.header', context);

      if ($mainHeader.once('scroll-hide').length) {
        var menuBehavior = drupalSettings.demo_design_system_theme.menu_behavior;

        if (menuBehavior !== 'Sticky' && menuBehavior !== 'Persistent') {
          return;
        }

        var isiAjusting = function isiAjusting(headerState) {
          var $sidebarISI = $('.region-sidebar-right .inline-isi-wrapper', context);
          var top = 0;

          if (headerState === 'header-opened') {
            top = $mainHeader.height() + 'px';
            $sidebarISI.removeClass('js--header-closed');
          } else {
            $sidebarISI.addClass('js--header-closed');
          }

          $sidebarISI.css('top', top);
        };

        if (menuBehavior === 'Persistent') {
          $mainHeader.addClass('position-fixed');

          var contentAjusting = function contentAjusting() {
            var headerHeight = $mainHeader.height() + 'px';
            $('#main-content', context).css('padding-top', headerHeight);
            isiAjusting('header-opened');
          };

          $(window).on('load resize orientationchange', function () {
            contentAjusting();
          });
          return;
        }

        var prevScrollpos = window.pageYOffset;
        var scrollOffset = 200;
        var scrolling = false;
        var $copyHeader = $mainHeader.clone(true).addClass('position-fixed').addClass('js--header-hidden').css('display', 'none');
        $(document.body).prepend($copyHeader);

        var autoHideHeader = function autoHideHeader() {
          var currentScrollPos = window.pageYOffset;

          if (currentScrollPos <= 0) {
            $copyHeader.hide();
          } else if (currentScrollPos > scrollOffset) {
            $copyHeader.addClass('js--header-hidden');
            isiAjusting('header-closed');
            $copyHeader.show();
          }

          if (prevScrollpos > currentScrollPos) {
            $copyHeader.removeClass('js--header-hidden');
            isiAjusting('header-opened');
          } else {
            if (currentScrollPos > scrollOffset) {
              $copyHeader.addClass('js--header-hidden');
              isiAjusting('header-closed');
            }
          }

          prevScrollpos = currentScrollPos;
          scrolling = false;
        };

        $(window).on('scroll', function () {
          if (!scrolling) {
            scrolling = true;

            if (!window.requestAnimationFrame) {
              setTimeout(autoHideHeader, 250);
            } else {
              requestAnimationFrame(autoHideHeader);
            }
          }
        });
      }
    }
  };
})(jQuery, Drupal, drupalSettings);
