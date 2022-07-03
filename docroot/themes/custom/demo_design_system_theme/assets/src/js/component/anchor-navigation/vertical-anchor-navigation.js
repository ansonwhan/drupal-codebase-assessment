jQuery(document).ready(function($) {
  const isStorybookJs = false;
  //common variables
  let isDevEnvFlag = false;
  let animationDuration = 250;

  if (typeof window.storybookGlobalFunctions !== 'undefined' && isStorybookJs) {
    const storybookGlobal = window.storybookGlobalFunctions;
    isDevEnvFlag = storybookGlobal.isDevEnv();
    animationDuration = storybookGlobal.animationDuration;
  } else {
    console.log('Storybook JS functionalities for specific prototype not loaded');
  }

  //common variables
  const bodySelector = $('html, body');
  const scrollSpyScrollableContainer = "#js-scrollable-container";
  const scrollSpyNonScrollableContainer = "#js-non-scrollable-container";

  const spiedScrollableContainer = $(`[data-target="${scrollSpyScrollableContainer}"]`);
  const spiedNonScrollableContainer = $(`#js-spied-non-scrollable-container`);

  const faChevronUp = $(".fa-chevron-up.js-scrollable");
  const faChevronUpNonScrollable = $(".fa-chevron-up.js-non-scrollable");

  const faChevronDown = $(".fa-chevron-down.js-scrollable");
  const faChevronDownNonScrollable = $(".fa-chevron-down.js-non-scrollable");

  const cssActiveClass = "active";

  const collapsedNavContainer = ".vertical-anchor-navigation-collapse";

  const isFirstElementActive = (selector = '') => $(`${selector} li:first-child a`).hasClass(
    cssActiveClass);

  const isBeforeLastElementActive = (selector = '') => $(`${selector} ul li`)
  .eq(-2)
  .find('a')
  .hasClass(
    cssActiveClass);

  const scrollToTopOfSpiedContainer = (isNonScrollableContainer = false) => isNonScrollableContainer ?
    faChevronUpNonScrollable.click(function() {
      bodySelector.animate({
        scrollTop: spiedNonScrollableContainer.offset().top - 160
      }, animationDuration);
    }) :
    faChevronUp.click(function() {
      spiedScrollableContainer.animate({ scrollTop: 0 }, animationDuration);
    });


  const scrollToBottomOfSpiedContainer = (isNonScrollableContainer = false) => isNonScrollableContainer ?
    faChevronDownNonScrollable.click(function() {
      const lastDivId = spiedNonScrollableContainer.children('div').last().attr('id');
      bodySelector.animate({
        scrollTop: $(`#${lastDivId}`).position().top + 90
      }, animationDuration);
    }) :
    faChevronDown.click(function() {
      spiedScrollableContainer.animate({
        scrollTop: spiedScrollableContainer[0].scrollHeight
      }, animationDuration);
    });

  (function arrowsInNavigationAnchorScrollableContainer() {

    //initially set active class
    setTimeout(function() {
      isFirstElementActive(scrollSpyScrollableContainer) && faChevronDown.addClass('active'); // jshint ignore:line
    }, animationDuration);

    spiedScrollableContainer.scroll(function() {

      //scrollable container
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
    //initially set active class
    setTimeout(function() {
      faChevronDownNonScrollable.addClass('active'); // jshint ignore:line
    }, animationDuration);


    $(window).scroll(function() {

      //non scrollable container
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
    $(`${scrollSpyScrollableContainer} a[href^='#']`).on('click', function(event) {
      const target = $(this.hash);
      event.preventDefault();

      const spiedContainer = $(`[data-target="${scrollSpyScrollableContainer}"]`);

      spiedContainer.animate({
        scrollTop: spiedContainer.scrollTop = spiedContainer.scrollTop() + target.offset().top - spiedContainer.offset().top
      }, {
        duration: animationDuration,
        complete: isDevEnvFlag && console.log(
          "BS smooth scroll spy animation completed")
      });

    });
  })();

  (function smoothlyScrollNonScrollableContainer() {
    $(`${scrollSpyNonScrollableContainer} a[href^='#']`).on('click', function(event) {
      const target = $(this.hash);
      event.preventDefault();

      const spiedContainer = $(`body, html`);

      spiedContainer.animate({
        scrollTop: target.offset().top - 160
      }, {
        duration: animationDuration,
        complete: isDevEnvFlag && console.log(
          "BS smooth scroll spy animation completed")
      });
    });
  })();

  (function expandCollapseNavigation() {
    $(`${collapsedNavContainer} h5`).on('click', function() {

      const _this = $(this);
      const collapsedExpandedNav = $(`${collapsedNavContainer} nav`);
      let clicks = _this.data('clicks');

      //"plus / minus" animation
      _this.toggleClass('expanded-collapse-title');

      clicks ? collapsedExpandedNav.hide() : collapsedExpandedNav.show(); // jshint ignore:line

      //even / odd clicks flag
      _this.data("clicks", !clicks);
    });
  })();

});
