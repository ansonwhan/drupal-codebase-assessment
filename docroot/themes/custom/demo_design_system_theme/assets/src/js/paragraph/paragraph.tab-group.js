/**
 * @file
 * Tab settings.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.tabGroup = {
    attach: function (context, settings) {
      var $tabWrapper = $('.paragraph--type--tab-group', context);

      var equalHeight = function ($selector) {
        $selector.css('height', 'auto');

        if(($tabWrapper.hasClass('custom--display-type--accordion0')
            || $tabWrapper.hasClass('custom--display-type--accordion1'))
            && $(window).innerWidth() < 768) {
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

      // Overflow tab menu.
      // debulked onresize handler
      function on_resize(c, t) {
        onresize = function () {
          clearTimeout(t);
          t = setTimeout(c, 100)
        };
        return c
      }

      /*
      Goal: As the viewport width decreases, take any links that don't fit in the horizontal menu bar and move them into a vertical dropdown menu.
      This should also run on load, but right now it's only on (throttled) resize...
      */

      var $region = $('.custom--display-type--h_tabbed.custom--overflow-menu--true');
      var $nav = $('.custom--tab-sections', $region);

      var appendToggler = function() {
        $nav.addClass('js--overflow-menu-tab');

        $('.js--overflow-menu-tab .nav-tabs', $region).once('custom--more-append-tab').append('<a class="custom--more overflow-squares-menu d-flex justify-content-center align-items-center">\n' +
            '    <i class="fas fa-square-full"></i>\n' +
            '    <i class="fas fa-square-full spacer"></i>\n' +
            '    <i class="fas fa-square-full"></i>\n' +
            '    <ul class="custom--overflow nav"></ul>\n' +
            '  </a>');
      };

      appendToggler();

      var overflowMenu = function () {

        $region.each(function () {
          var $_self = $(this);

          appendToggler();

          // horizontal room we have to work with (the container)
          // this value doesn't change until we resize again
          var navSpace = $('.js--overflow-menu-tab ul.nav-tabs', $(this)).outerWidth() - 50;
          if (navSpace < 0) {
            navSpace = 0;
          }

          // calc the combined width of all links currently in the horizontal menu
          var linksWidth = 0;
          $('li', $('.js--overflow-menu-tab ul.nav-tabs', $(this))).each(function () {
            linksWidth += $(this).outerWidth();
          });

          // now let's compare them to see if all the links fit in the
          // container...
          if (linksWidth > navSpace) {
            // uh oh, the width of the links is greater than the width of their
            // container... keep moving links from the menu to the overflow until
            // the combined width is less than the container...
            while (linksWidth > navSpace) {
              var lastLink = $('.js--overflow-menu-tab ul.nav-tabs > li:last', $(this)); // get the last link
              var lastLinkWidth = lastLink.outerWidth(); // get its width...
              $(lastLink).data('foo', lastLinkWidth); // store the width (so that
                                                      // we can see if it fits
                                                      // back in the space
                                                      // available later)
              $('a', lastLink).removeClass('active');
              $('.custom--overflow', $(this)).prepend(lastLink); // pop the link and push
              // it to the overflow
              linksWidth = linksWidth - lastLinkWidth; // recalc the linksWidth
                                                       // since we removed one
            }

            $('.custom--more', $(this)).show().addClass('d-flex'); // make sure we can see the overflow menu
          }
          else {
            // shazam, the width of the links is less than the width of their
            // container... let's move links from the overflow back into the menu
            // until we run out of room again...
            while (linksWidth <= navSpace) {
              var firstOverflowLink = $('.custom--overflow > li:first', $(this));
              var firstOverflowLinkWidth = firstOverflowLink.data('foo');
              if (navSpace - linksWidth > firstOverflowLinkWidth) {
                $('.js--overflow-menu-tab ul.nav-tabs', $(this)).append(firstOverflowLink);
                $('a', firstOverflowLink).removeClass('active');
              }
              linksWidth = linksWidth + firstOverflowLinkWidth; // recalc the
                                                                // linksWidth
                                                                // since we added
                                                                // one
            }

            // should we hide the overflow menu?
            if ($('.custom--overflow > li', $(this)).length == 0) {
              $('.custom--more', $(this)).removeClass('d-flex').hide();
            }
            else {
              $('.custom--more', $(this)).addClass('d-flex').show();
            }
          } // end else

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

        // Links active state.
        $('.collapse', $_self).on('hidden.bs.collapse', function () {
          $('a', $(this).prev()).removeClass('active');
        }).on('shown.bs.collapse', function () {
          $('a', $(this).prev()).addClass('active');
        })

        // Equal height.
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
