"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.paragraphCarousel = {
    attach: function attach(context, settings) {
      $('.custom--carousel', context).once('slick-slider').each(function () {
        var $carouselWrapper = $(this).closest('.a-spot-hero-carousel');
        var carouselId = $carouselWrapper.attr('id');

        $('.media__image', context).once('slick-slider-image').each(function () {
          var src = $(this).attr('src');
          var imageId = String(CryptoJS.MD5(src)).slice(-5);
          $(this).attr('data-analytics-position', 'Body')
              .attr('data-analytics-id', imageId)
              .addClass('analytics--p-slideshow-image')
        });

        var slider = $(this).on('init afterChange', function(event, slick){
          var $dots = $('.slick-dots', $carouselWrapper);

          var $currentDot = $('.slick-active', $dots);
          $('button', $currentDot).addClass('analytics--p-slideshow-current')
              .removeClass('analytics--p-slideshow-left')
              .removeClass('analytics--p-slideshow-right')
              .attr('data-analytics-position', 'Body')
              .attr('data-analytics-id', 'dot-current-' + carouselId);

          var $prevDot = $currentDot.prev();
          $('button', $prevDot).addClass('analytics--p-slideshow-left')
              .removeClass('analytics--p-slideshow-current')
              .removeClass('analytics--p-slideshow-right')
              .attr('data-analytics-position', 'Body')
              .attr('data-analytics-id', 'dot-prev-' + carouselId);

          var $nextDot = $currentDot.next();
          $('button', $nextDot).addClass('analytics--p-slideshow-right')
              .removeClass('analytics--p-slideshow-current')
              .removeClass('analytics--p-slideshow-left')
              .attr('data-analytics-position', 'Body')
              .attr('data-analytics-id', 'dot-next-' + carouselId);
        }).slick({
          autoplay: !!$carouselWrapper.data('carousel-autoplay'),
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: !!$carouselWrapper.data('carousel-arrows'),
          prevArrow: "<button class='custom-slick-prev slick-prev analytics--n-arrow' data-analytics-position='Body' data-analytics-id='btn-prev-" + carouselId + "' aria-label='Previous' type='button'></button>",
          nextArrow: "<button class='custom-slick-next slick-next analytics--n-arrow' data-analytics-position='Body' data-analytics-id='btn-next-" + carouselId + "' aria-label='Next' type='button'></button>",
          dots: !!$carouselWrapper.data('carousel-dots'),
          infinite: !!$carouselWrapper.data('carousel-loop'),
        });

        if ($carouselWrapper.data('carousel-arrows-disabling')) {
          slider.slick("slickSetOption", "infinite", false, false);
          slider.slick('refresh');
        }
      });
    }
  };
})(jQuery, Drupal);
