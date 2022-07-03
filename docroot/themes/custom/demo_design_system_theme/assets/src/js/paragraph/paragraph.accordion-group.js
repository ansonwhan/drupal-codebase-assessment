/**
 * @file
 * Accordion settings.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.accordionGroup = {
    attach: function (context, settings) {
      $('.accordion-group').once('accordionGroup').each(function () {
        var _self = $(this);

        $('.accordion-group--accordions', context).each(function() {

          //Analytics.
          $('.card-link', $(this)).once('card-link-click').click(function () {
            $(this).toggleClass('analytics--p-accordion-expand')
                .toggleClass('analytics--p-accordion-collapse');
          });

          if ($(this).hasClass('expanded-always') || $(this).hasClass('expanded-desktop')) {
            var firstRow = $(this).find('.accordion-item:first-of-type');
            $(firstRow).find('.card-link').removeClass('collapsed').removeClass('analytics--p-accordion-expand').addClass('analytics--p-accordion-collapse');
            if ($(this).hasClass('expanded-desktop')) {
              $(firstRow).find('.accordion-header a.card-link').addClass('collapsed-md');
              $(firstRow).find('.accordion--body').addClass('show-lg');
            } else {
              $(firstRow).find('.accordion--body').addClass('show');
            }
          }
          if ($(this).hasClass('auto-collapse')) {
            const accordionGroupId = '#' + ($(this).closest('.accordion-group').attr('id'));
            $(this).find('.accordion--body').attr('data-parent', accordionGroupId );
          }
        })

        /**
         * Expanded first row desktop only.
         */
        function firstRowMediaClass() {
          var screenWidth = window.screen.width;

          $('.accordion-item', _self).each(function () {
            if (screenWidth > 992) {
              $('.show-lg', this).addClass('show');
              $('.collapsed-md', this).removeClass('collapsed');
            }
            else {
              $('.show-lg', this).removeClass('show');
              $('.collapsed-md', this).addClass('collapsed');
            }
          });
        }

        window.addEventListener('load', firstRowMediaClass);
        window.addEventListener('resize', firstRowMediaClass);

      });

      $('.accordion-item .card-link').on('click', function() {
        if ($(this).closest('.accordion-group--accordions').hasClass('auto-collapse')) {
          var headerHeight = $('body').find('#section-header').height();
          var selectedAccordionItem = $(this).closest('.accordion-item');
          window.setTimeout(function() {
            var topOfSelectedAccordion = $(selectedAccordionItem).offset().top;
            window.scrollTo({ top: topOfSelectedAccordion - headerHeight, behavior: 'smooth'});
          }, 200);
        }
        if($(this).hasClass('collapsed')){
          $(this).closest('.accordion-item.card').addClass('ods-accordion-item-expended')
        }else {
          $(this).closest('.accordion-item.card').removeClass('ods-accordion-item-expended')
        }
      });
    }
  };

})(jQuery, Drupal);
