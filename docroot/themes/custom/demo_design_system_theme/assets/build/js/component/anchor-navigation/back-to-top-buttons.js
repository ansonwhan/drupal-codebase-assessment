"use strict";

jQuery(document).ready(function ($) {
  var backToTopStorybookGlobal = window.storybookGlobalFunctions;
  var squareButtonScrollTop = $('#js-sticky-back-to-top');
  var ovalButtonScrollTop = $('#js-scroll-top');
  var fadeInOrOutButton = '.js-fade-in-or-out';
  var browserWindowCalculationParams = {
    documentHeight: backToTopStorybookGlobal.documentHeight,
    windowHeight: backToTopStorybookGlobal.windowHeight,
    heightFactor: backToTopStorybookGlobal.calculatePercentHeight25()
  };

  var isDocumentHeightGreaterThan = function isDocumentHeightGreaterThan(_ref) {
    var _ref$documentHeight = _ref.documentHeight,
      documentHeight = _ref$documentHeight === void 0 ? 0 : _ref$documentHeight,
      _ref$windowHeight = _ref.windowHeight,
      windowHeight = _ref$windowHeight === void 0 ? 0 : _ref$windowHeight,
      _ref$heightFactor = _ref.heightFactor,
      heightFactor = _ref$heightFactor === void 0 ? 0 : _ref$heightFactor;
    return documentHeight - windowHeight > heightFactor;
  };

  (function ifDesiredDocumentHeightShowComponent() {
    isDocumentHeightGreaterThan(browserWindowCalculationParams) && $('.js-show-button').show();
  })();

  (function initiallyHideFadeInButton() {
    $(fadeInOrOutButton).hide();
  })();

  ovalButtonScrollTop.click(function () {
    backToTopStorybookGlobal.scrollTop();
  });
  squareButtonScrollTop.click(function () {
    backToTopStorybookGlobal.scrollTop();
  });

  var onScrollFadeInOutScrollButton = function onScrollFadeInOutScrollButton() {
    return $(window).bind('scroll', function () {
      var documentPercentHeight = backToTopStorybookGlobal.calculatePercentHeight10();
      var stickyBackToTopPrototype = $(fadeInOrOutButton);

      if($(window).scrollTop() > documentPercentHeight) {
        stickyBackToTopPrototype.fadeIn(backToTopStorybookGlobal.animationDuration);
      }
      else {
        stickyBackToTopPrototype.fadeOut(backToTopStorybookGlobal.animationDuration);
      }
    });
  };

  onScrollFadeInOutScrollButton();

  var scrollToSpecificElement = function scrollToSpecificElement() {
    var specificElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#js-scroll-to-example';
    var clickHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#js-on-click-scroll-example";
    return $(clickHandler).on('click', function (event) {
      event.preventDefault();
      $("html, body").animate({
        scrollTop: $(specificElement).offset().top
      }, window.storybookGlobalFunctions.animationDuration);
    });
  };

  scrollToSpecificElement();
});
