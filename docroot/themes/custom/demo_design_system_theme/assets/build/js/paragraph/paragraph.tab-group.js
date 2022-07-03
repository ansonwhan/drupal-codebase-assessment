"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.tabGroup = {
    attach: function attach(context, settings) {
      var $tabWrapper = $('.paragraph--type--tab-group', context);

      var equalHeight = function equalHeight($selector) {
        $selector.css('height', 'auto');

        if (($tabWrapper.hasClass('custom--display-type--accordion0') || $tabWrapper.hasClass('custom--display-type--accordion1')) && $(window).innerWidth() < 768) {
          return;
        }

        var maxHeight = 0;
        $selector.each(function () {
          if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
          }
        });
        $selector.height(maxHeight);
      };

      function on_resize(c, t) {
        onresize = function onresize() {
          clearTimeout(t);
          t = setTimeout(c, 100);
        };

        return c;
      }

      var $region = $('.custom--display-type--h_tabbed.custom--overflow-menu--true');
      var $nav = $('.custom--tab-sections', $region);

      var appendToggler = function appendToggler() {
        $nav.addClass('js--overflow-menu-tab');
        $('.js--overflow-menu-tab .nav-tabs', $region).once('custom--more-append-tab').append('<a class="custom--more overflow-squares-menu d-flex justify-content-center align-items-center">\n' + '    <i class="fas fa-square-full"></i>\n' + '    <i class="fas fa-square-full spacer"></i>\n' + '    <i class="fas fa-square-full"></i>\n' + '    <ul class="custom--overflow nav"></ul>\n' + '  </a>');
      };

      appendToggler();

      var overflowMenu = function overflowMenu() {
        $region.each(function () {
          var $_self = $(this);
          appendToggler();
          var navSpace = $('.js--overflow-menu-tab ul.nav-tabs', $(this)).outerWidth() - 50;

          if (navSpace < 0) {
            navSpace = 0;
          }

          var linksWidth = 0;
          $('li', $('.js--overflow-menu-tab ul.nav-tabs', $(this))).each(function () {
            linksWidth += $(this).outerWidth();
          });

          if (linksWidth > navSpace) {
            while (linksWidth > navSpace) {
              var lastLink = $('.js--overflow-menu-tab ul.nav-tabs > li:last', $(this));
              var lastLinkWidth = lastLink.outerWidth();
              $(lastLink).data('foo', lastLinkWidth);
              $('a', lastLink).removeClass('active');
              $('.custom--overflow', $(this)).prepend(lastLink);
              linksWidth = linksWidth - lastLinkWidth;
            }

            $('.custom--more', $(this)).show().addClass('d-flex');
          } else {
            while (linksWidth <= navSpace) {
              var firstOverflowLink = $('.custom--overflow > li:first', $(this));
              var firstOverflowLinkWidth = firstOverflowLink.data('foo');

              if (navSpace - linksWidth > firstOverflowLinkWidth) {
                $('.js--overflow-menu-tab ul.nav-tabs', $(this)).append(firstOverflowLink);
                $('a', firstOverflowLink).removeClass('active');
              }

              linksWidth = linksWidth + firstOverflowLinkWidth;
            }

            if ($('.custom--overflow > li', $(this)).length == 0) {
              $('.custom--more', $(this)).removeClass('d-flex').hide();
            } else {
              $('.custom--more', $(this)).addClass('d-flex').show();
            }
          }

          $('.nav-tabs > li > .nav-link', $(this)).click(function () {
            $('.custom--overflow .nav-link', $_self).removeClass('active');
          });
          $('.custom--overflow .nav-link', $(this)).click(function () {
            $('.nav-tabs > li > .nav-link', $_self).removeClass('active');
          });
        });
      };

      overflowMenu();
      on_resize(overflowMenu);
      $tabWrapper.once('tabWrapper').each(function () {
        var $_self = $(this);
        $('.collapse', $_self).on('hidden.bs.collapse', function () {
          $('a', $(this).prev()).removeClass('active');
        }).on('shown.bs.collapse', function () {
          $('a', $(this).prev()).addClass('active');
        });

        if ($_self.hasClass('custom--consistent-height--true')) {
          equalHeight($('.tab-pane', $_self));
          $(window).resize(function () {
            equalHeight($('.tab-pane', $_self));
          });
        }
      });
    }
  };
})(jQuery, Drupal);
