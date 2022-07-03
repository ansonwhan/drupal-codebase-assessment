"use strict";

jQuery(document).ready(function ($) {
  var isStorybookJs = false;
  var isDevEnvFlag = false;
  var animationDuration = 250;

  if (typeof window.storybookGlobalFunctions !== 'undefined' && isStorybookJs) {
    var storybookGlobal = window.storybookGlobalFunctions;
    isDevEnvFlag = storybookGlobal.isDevEnv();
    animationDuration = storybookGlobal.animationDuration;
  } else {
    console.log('Storybook JS functionalities for specific prototype not loaded');
  }

  var bodySelector = $('html, body');
  var scrollSpyScrollableContainer = "#js-scrollable-container";
  var scrollSpyNonScrollableContainer = "#js-non-scrollable-container";
  var spiedScrollableContainer = $("[data-target=\"".concat(scrollSpyScrollableContainer, "\"]"));
  var spiedNonScrollableContainer = $("#js-spied-non-scrollable-container");
  var faChevronUp = $(".fa-chevron-up.js-scrollable");
  var faChevronUpNonScrollable = $(".fa-chevron-up.js-non-scrollable");
  var faChevronDown = $(".fa-chevron-down.js-scrollable");
  var faChevronDownNonScrollable = $(".fa-chevron-down.js-non-scrollable");
  var cssActiveClass = "active";
  var collapsedNavContainer = ".vertical-anchor-navigation-collapse";

  var isFirstElementActive = function isFirstElementActive() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return $("".concat(selector, " li:first-child a")).hasClass(cssActiveClass);
  };

  var isBeforeLastElementActive = function isBeforeLastElementActive() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return $("".concat(selector, " ul li")).eq(-2).find('a').hasClass(cssActiveClass);
  };

  var scrollToTopOfSpiedContainer = function scrollToTopOfSpiedContainer() {
    var isNonScrollableContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return isNonScrollableContainer ? faChevronUpNonScrollable.click(function () {
      bodySelector.animate({
        scrollTop: spiedNonScrollableContainer.offset().top - 160
      }, animationDuration);
    }) : faChevronUp.click(function () {
      spiedScrollableContainer.animate({
        scrollTop: 0
      }, animationDuration);
    });
  };

  var scrollToBottomOfSpiedContainer = function scrollToBottomOfSpiedContainer() {
    var isNonScrollableContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return isNonScrollableContainer ? faChevronDownNonScrollable.click(function () {
      var lastDivId = spiedNonScrollableContainer.children('div').last().attr('id');
      bodySelector.animate({
        scrollTop: $("#".concat(lastDivId)).position().top + 90
      }, animationDuration);
    }) : faChevronDown.click(function () {
      spiedScrollableContainer.animate({
        scrollTop: spiedScrollableContainer[0].scrollHeight
      }, animationDuration);
    });
  };

  (function arrowsInNavigationAnchorScrollableContainer() {
    setTimeout(function () {
      isFirstElementActive(scrollSpyScrollableContainer) && faChevronDown.addClass('active');
    }, animationDuration);
    spiedScrollableContainer.scroll(function () {
      if (isFirstElementActive(scrollSpyScrollableContainer)) {
        faChevronDown.addClass(cssActiveClass);
        faChevronUp.removeClass(cssActiveClass);
      } else if (isBeforeLastElementActive(scrollSpyScrollableContainer)) {
        faChevronUp.addClass(cssActiveClass);
        faChevronDown.removeClass(cssActiveClass);
      }
    });
    scrollToTopOfSpiedContainer();
    scrollToBottomOfSpiedContainer();
  })();

  (function arrowsInNavigationAnchorNonScrollableContainer() {
    setTimeout(function () {
      faChevronDownNonScrollable.addClass('active');
    }, animationDuration);
    $(window).scroll(function () {
      if (isFirstElementActive(scrollSpyNonScrollableContainer)) {
        faChevronDownNonScrollable.addClass(cssActiveClass);
        faChevronUpNonScrollable.removeClass(cssActiveClass);
      } else if (isBeforeLastElementActive(scrollSpyNonScrollableContainer)) {
        faChevronUpNonScrollable.addClass(cssActiveClass);
        faChevronDownNonScrollable.removeClass(cssActiveClass);
      }
    });
    scrollToTopOfSpiedContainer(true);
    scrollToBottomOfSpiedContainer(true);
  })();

  (function smoothlyScrollScrollableContainer() {
    $("".concat(scrollSpyScrollableContainer, " a[href^='#']")).on('click', function (event) {
      var target = $(this.hash);
      event.preventDefault();
      var spiedContainer = $("[data-target=\"".concat(scrollSpyScrollableContainer, "\"]"));
      spiedContainer.animate({
        scrollTop: spiedContainer.scrollTop = spiedContainer.scrollTop() + target.offset().top - spiedContainer.offset().top
      }, {
        duration: animationDuration,
        complete: isDevEnvFlag && console.log("BS smooth scroll spy animation completed")
      });
    });
  })();

  (function smoothlyScrollNonScrollableContainer() {
    $("".concat(scrollSpyNonScrollableContainer, " a[href^='#']")).on('click', function (event) {
      var target = $(this.hash);
      event.preventDefault();
      var spiedContainer = $("body, html");
      spiedContainer.animate({
        scrollTop: target.offset().top - 160
      }, {
        duration: animationDuration,
        complete: isDevEnvFlag && console.log("BS smooth scroll spy animation completed")
      });
    });
  })();

  (function expandCollapseNavigation() {
    $("".concat(collapsedNavContainer, " h5")).on('click', function () {
      var _this = $(this);

      var collapsedExpandedNav = $("".concat(collapsedNavContainer, " nav"));

      var clicks = _this.data('clicks');

      _this.toggleClass('expanded-collapse-title');

      clicks ? collapsedExpandedNav.hide() : collapsedExpandedNav.show();

      _this.data("clicks", !clicks);
    });
  })();
});
