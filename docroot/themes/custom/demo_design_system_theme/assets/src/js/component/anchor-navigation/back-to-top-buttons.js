jQuery(document).ready(function($) {

  const backToTopStorybookGlobal = window.storybookGlobalFunctions;

  //common variables
  const squareButtonScrollTop = $('#js-sticky-back-to-top');
  const ovalButtonScrollTop = $('#js-scroll-top');
  const fadeInOrOutButton = '.js-fade-in-or-out';

  const browserWindowCalculationParams = {
    documentHeight: backToTopStorybookGlobal.documentHeight,
    windowHeight: backToTopStorybookGlobal.windowHeight,
    heightFactor: backToTopStorybookGlobal.calculatePercentHeight25(),
  };

  //common functions
  const isDocumentHeightGreaterThan = ({ documentHeight = 0, windowHeight = 0, heightFactor = 0 }) => documentHeight - windowHeight > heightFactor;

  (function ifDesiredDocumentHeightShowComponent() {
    isDocumentHeightGreaterThan(browserWindowCalculationParams) && $('.js-show-button').show(); // jshint ignore:line
  })();

  (function initiallyHideFadeInButton() {
    $(fadeInOrOutButton).hide();
  })();

  ovalButtonScrollTop.click(function() {
    backToTopStorybookGlobal.scrollTop();
  });

  squareButtonScrollTop.click(function() {
    backToTopStorybookGlobal.scrollTop();
  });

  const onScrollFadeInOutScrollButton = () => $(window)
  .bind('scroll', function() {

    const documentPercentHeight = backToTopStorybookGlobal.calculatePercentHeight10();
    const stickyBackToTopPrototype = $(fadeInOrOutButton);

    if ($(window).scrollTop() > documentPercentHeight) {
      stickyBackToTopPrototype.fadeIn(backToTopStorybookGlobal.animationDuration);
    } else {
      stickyBackToTopPrototype.fadeOut(backToTopStorybookGlobal.animationDuration);
    }
  });

  onScrollFadeInOutScrollButton();

  /*
    For storybook purpose we have additional click handler (to show the functionality).
     On the implementation side, please edit these variables: specificElement, clickHandler
  */
  const scrollToSpecificElement = (specificElement = '#js-scroll-to-example', clickHandler = "#js-on-click-scroll-example") =>
    $(clickHandler).on('click', function(event) {
      event.preventDefault();
      $(`html, body`).animate({
        scrollTop: $(specificElement).offset().top
      }, window.storybookGlobalFunctions.animationDuration);
    });
  scrollToSpecificElement();


});


