jQuery(document).ready(function($) {

  //global namespace for universal storybook functions
  window.storybookGlobalFunctions = {
    animationDuration: 1000,
    documentHeight: $(document).height(),
    windowHeight: $(window).height(),

    scrollTop: () =>
      $(`html, body`)
      .animate({scrollTop: 0},
        window.storybookGlobalFunctions.animationDuration),

    calculatePercentHeight10: () => Math.floor(window.storybookGlobalFunctions.documentHeight * 0.1), //10%
    calculatePercentHeight25: () => Math.floor(window.storybookGlobalFunctions.documentHeight * 0.25), //25%
    calculatePercentHeight30: () => Math.floor(window.storybookGlobalFunctions.documentHeight * 0.3), //30%
    calculatePercentHeight40: () => Math.floor(window.storybookGlobalFunctions.documentHeight * 0.4), //40%
    calculatePercentHeight50: () => Math.floor(window.storybookGlobalFunctions.documentHeight * 0.5), //50%
    calculatePercentHeight80: () => Math.floor(window.storybookGlobalFunctions.documentHeight * 0.8), //80%
    isDevEnv: () => ['localhost', 'dev'].some(devEnvParam => window.location.href.includes(
      devEnvParam)),
    isStoryBook: () => $('.js-storybook-components').length
  };

});
