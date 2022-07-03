/**
 * @file
 * Paragraph video item functions.
 *
 */
(function ($, Drupal) {

  Drupal.behaviors.paragraphVideoItem = {
    attach: function (context, settings) {
      if (context !== document) {
        return;
      }
      $('.custom--video-item', context).once('paragraphVideoItem').each(function () {
        var _self = $(this);

        $('.custom--video-modal', _self)
            .on('shown.bs.modal', function (e) {
              Drupal.blazy.init.load(document.querySelector('.b-lazy'), true);

              $('.custom--video-player .video-js', _self).each(function () {
                $(this).find('video')[0].play();
              });
            })
            .on('hide.bs.modal', function (e) {
              $('.custom--video-player .video-js', _self).each(function () {
                $(this).find('video')[0].pause();
              });
            })

      });
    }
  };

})(jQuery, Drupal);
