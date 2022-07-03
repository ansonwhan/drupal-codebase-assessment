"use strict";

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.nodeArticleTeaserMasonry = {
    attach: function attach(context, settings) {
      this.applyMasonryContainerHeight();
      $(window).on('resize', function () {
        Drupal.behaviors.nodeArticleTeaserMasonry.applyMasonryContainerHeight();
      });
    },
    applyMasonryContainerHeight: function applyMasonryContainerHeight() {
      var $blockContainer = $('.item-cards.ods-articles-grid');
      var $windowWidth = $(window).width();

      if ($blockContainer.length && $windowWidth > 480) {
        var $bricks = $blockContainer.children('.views-row');
        var $columns = 3;

        if ($windowWidth < 780) {
          $columns = 2;
        }

        var $count = Math.ceil($bricks.length / $columns);
        var $maxBrickHeight = Math.max.apply(Math, $bricks.map(function () {
          return $(this).height();
        }).get());
        $maxBrickHeight += 16;
        var $bricksContainerHeight = $count * $maxBrickHeight;
        $blockContainer.first().css('max-height', $bricksContainerHeight);
      }
    }
  };
})(jQuery, Drupal);
