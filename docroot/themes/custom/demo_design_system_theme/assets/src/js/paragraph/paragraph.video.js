/**
 * @file
 * Paragraph video functions.
 *
 */
(function ($, Drupal) {

  Drupal.behaviors.paragraphVideo = {
    attach: function (context, settings) {
      if (context !== document) {
        return;
      }
      $('.paragraph--type--video.paragraph--view-mode--default', context).once('paragraphVideo').each(function () {
        var _self = $(this);
        Drupal.blazy.init.load(document.querySelector('.b-lazy'), true);
        $('.field-name-field-ods-video-p', this).click(function () {
          var bLazy = new Blazy();
          var embedVideo = $('.media__iframe', this);
          var video = $('video', this);
          _self.addClass('thumb-hidden');
          if (embedVideo.length > 0) {
            embedVideo[0].src += '1';
          }
          if (video.length > 0) {
            video[0].play();
          }
        });
      });
    }
  };

})(jQuery, Drupal);
