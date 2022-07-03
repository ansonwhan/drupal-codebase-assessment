/**
 * @file
 * Paragraph video group functions.
 *
 */
(function ($, Drupal) {

  Drupal.behaviors.paragraphVideoGroup = {
    attach: function (context, settings) {
      if (context !== document) {
        return;
      }
      $('.custom--video-group', context).once('paragraphVideoGroup').each(function () {
        var _self = $(this);

        $('.custom--video-thumbs-wrapper .custom--video-item-wrapper:first-child .paragraph--type--video-item').addClass('custom--active-video-thumb');

        var setOverlay = function() {
          $('.custom--teaser-overlay', _self).click(function () {
            var $group = $(this).closest('.custom--video-group');
            var $bigPlayer = $('.custom--big-player', $group);
            var $item = $(this).closest('.custom--video-item-wrapper');
            var videoId = $item.data('video-id');

            $('.paragraph--type--video-item', $group).removeClass('custom--active-video-thumb');
            $('.paragraph--type--video-item', $item).addClass('custom--active-video-thumb');

            try {
              $('.custom--current-video', $bigPlayer).find('video')[0].pause();
            }
            catch (error) {
              console.log(error);
            }

            $('.custom--video-item-wrapper', $bigPlayer).removeClass('custom--current-video');
            $('.custom--video-item-id-' + videoId, $bigPlayer).addClass('custom--current-video');

          });
        };

        if (_self.hasClass('custom--video-group-mode-teaser_grid')) {
          var showLess = function () {
            $('.custom--video-thumbs-wrapper .custom--video-item-wrapper', _self).each(function (key, item) {
              if (key > 1) {
                $(item).addClass('d-none');
              }
            });
          };

          showLess();

          $('.custom--video-show-more', _self).click(function (e) {
            e.preventDefault();
            $('.custom--video-thumbs-wrapper .custom--video-item-wrapper', _self).removeClass('d-none');
            $(this).addClass('d-none');
            $('.custom--video-show-less', _self).removeClass('d-none');
            Drupal.blazy.init.load(document.querySelector('.b-lazy'), true);
          });

          $('.custom--video-show-less', _self).click(function (e) {
            e.preventDefault();
            showLess();
            $(this).addClass('d-none');
            $('.custom--video-show-more', _self).removeClass('d-none');
          });
        }

        if (_self.hasClass('custom--video-group-mode-teaser_carousel')) {
          var carouselInit = function() {
            var $progressBar = $('.slider__progress', _self);
            var $progressBarLabel = $('.slider__label', _self);

            var $slider = $('.custom--video-thumbs-wrapper > .field', _self).slick({
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
              vertical: true,
              prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" aria-disabled="false">Show more <i class="fa fa-chevron-up" aria-hidden="true"></i><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
              nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" aria-disabled="false">Show more <i class="fa fa-chevron-down" aria-hidden="true"></i><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
              responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    vertical: false,
                    dots: false
                  }
                }
              ]
            });

            $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              var calc = nextSlide / (slick.slideCount - 3) * 100;
              $progressBar.css('background-size', calc + '% 100%').attr('aria-valuenow', calc);
              $progressBarLabel.text(calc + '% completed');
            });
          };


          if($('.custom--video-thumbs-wrapper > .field', _self).length !== 0) {
            carouselInit();

            $(window).on('resize', function () {
              try {
                $('.custom--video-thumbs-wrapper > .field', _self).slick('refresh');
                setTimeout(function() {
                  setOverlay();
                }, 500);
              } catch (e) {
                console.log(e);
              }
            });
          }
        }

        // Autoplay next video.
        var players = videojs.getPlayers();

        $.each(players, function (index, playerItem) {
          if ($(playerItem.el_).closest('.custom--video-item-wrapper').length === 1) {
            var $currentGroup = $(playerItem.el_).closest('.custom--video-group');
            if ($currentGroup.hasClass('custom--video-group-autoplay-true')) {
              playerItem.on('ended', function () {
                var currentId = $(playerItem.el_).closest('.custom--video-item-wrapper').data('video-id');

                var $nextThumb = $('.custom--video-thumbs-wrapper .custom--video-item-id-' + (currentId + 1) + ' .custom--teaser-overlay', $currentGroup);
                if ($nextThumb.length === 0) {
                  $nextThumb = $('.custom--video-thumbs-wrapper .custom--video-item-id-0 .custom--teaser-overlay', $currentGroup);
                }

                // Close modal.
                $('.modal').modal('hide');

                // Slide carousel to the next slide.
                var $nextSlide = $nextThumb.closest('.slick-slide');
                if ($nextSlide.length == 1) {
                  var $nextSlideId = $nextSlide.data('slick-index');
                  $('.custom--video-thumbs-wrapper > .field', _self).slick('slickGoTo', $nextSlideId);
                }

                // Click next thump to play.
                $nextThumb.click();

                var $currentBigVideo = $('.custom--big-player .custom--current-video', $currentGroup);

                // If video is in modal.
                if ($currentBigVideo.find('.custom-video-modal-preview').length !== 0) {
                  $currentBigVideo.find('.custom-video-modal-preview').trigger('click');
                }
                else {
                  // If video is videojs.
                  try {
                    $currentBigVideo.find('video')[0].play();
                  }
                  catch (error) {
                    console.log(error);
                  }
                }
              });
            }
          }
        });

        setOverlay();

      });
    }
  };

})(jQuery, Drupal);
