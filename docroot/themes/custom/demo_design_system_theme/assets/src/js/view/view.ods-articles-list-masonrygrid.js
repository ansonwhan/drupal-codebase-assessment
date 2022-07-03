/**
 * @file
 * Sets height to flexbox masonry container.
 * For more detail https://w3bits.com/flexbox-masonry/
 *
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.nodeArticleTeaserMasonry = {
    attach: function attach(context, settings) {
      this.applyMasonryContainerHeight();
      $( window ).on('resize', function() {
        Drupal.behaviors.nodeArticleTeaserMasonry.applyMasonryContainerHeight();
      });
    },

    applyMasonryContainerHeight : function () {
      var $blockContainer = $('.item-cards.ods-articles-grid');
      // $blockContainer.addClass('contextual-region'); // adding missing class for anonymous user which is masonry wrapper
      var $windowWidth = $(window).width();
      if ($blockContainer.length && $windowWidth > 480) { // if it is masonry block & not mobile view port
        var $bricks = $blockContainer.children('.views-row');
        var $columns = 3; // for tablet viewport 2 columns and for larger 3 columns
        if ($windowWidth < 780) {
          $columns = 2;
        }

        var $count = Math.ceil($bricks.length / $columns );
        var $maxBrickHeight = Math.max.apply(Math, $bricks.map(function () {
          return $(this).height();
        }).get());

        $maxBrickHeight += 16; // addition of margins/spacing
        var $bricksContainerHeight = $count * $maxBrickHeight;
        $blockContainer.first().css('max-height', $bricksContainerHeight);
      }
    }
  };
})(jQuery, Drupal);
