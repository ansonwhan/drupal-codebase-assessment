"use strict";

jQuery(window).on('load', function () {
  jQuery('#js-storybook-spinner').hide();
});
jQuery(document).ready(function ($) {
  var isiSideBarWrapper = $('.js-storybook-remove-isi');
  var body = $('body');
  var currentMode = $('#js-current-mode');

  var currentModeBadgeText = function currentModeBadgeText(currentModeName) {
    return currentMode.find('span').text(currentModeName);
  };

  var globStoryBookScope = window.storybookGlobalFunctions;

  (function generateFakeUrl() {
    var fallbackImageUrl = "https://fakeimg.pl/2000x2000/?text=Fake_Img";
    var $div = $('div'),
        bg = $div.find("[role='img']");
    bg.css('background-image', "url(".concat(fallbackImageUrl, ")"));
  })();

  var removeActiveSearchResultsClass = function removeActiveSearchResultsClass(olLiPrototype, visibleOlLiLength) {
    var olLiLength = olLiPrototype.length;

    if (olLiLength === visibleOlLiLength) {
      olLiPrototype.removeClass("active-search-results");
    }
  };

  (function searchPrototype() {
    $("#js-searchbar").keyup(function () {
      var input = $('#js-searchbar').val().toLowerCase();
      var olLiPrototype = $('.js-prototype-name');

      for (var i = 0; i < olLiPrototype.length; i++) {
        if (olLiPrototype.length === i) {
          olLiPrototype[i].classList.remove("active-search-results");
        }

        if (!olLiPrototype[i].innerHTML.toLowerCase().includes(input)) {
          olLiPrototype[i].style.display = "none";
        } else {
          olLiPrototype[i].style.display = "list-item";
          olLiPrototype[i].classList.add("active-search-results");
        }
      }

      var visibleOlLiLength = $('.js-prototype-name:visible').length;
      removeActiveSearchResultsClass(olLiPrototype, visibleOlLiLength);
    });
  })();

  (function smoothlyScrollToEveryAnchor() {
    globStoryBookScope.isStoryBook() && $(document).on('click', 'a[href^="#"]', function (event) {
      event.preventDefault();

      if ($.attr(this, 'href') !== '#') {
        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top - 300
        }, 500);
      }
    });
  })();

  (function scrollToBottomOfThePage() {
    $("#js-scroll-down").click(function () {
      $('html, body').animate({
        scrollTop: 999999
      }, 300);
    });
  })();

  (function scrollToTOPOfThePage() {
    $("#js-scroll-up").click(function () {
      $('html, body').animate({
        scrollTop: 'Opx'
      }, 300);
    });
  })();

  (function applyOneColumnLayout() {
    body.addClass('has-isi-side-bar');
    $("#js-apply-one-column-layout").click(function () {
      var clicks = $(this).data('clicks');

      if (clicks) {
        body.addClass('has-isi-side-bar');
        isiSideBarWrapper.show();
        currentModeBadgeText('Two Column');
      } else {
        body.removeClass('has-isi-side-bar');
        isiSideBarWrapper.hide();
        $('.carousel').slick('setDimensions');
        currentModeBadgeText('One Column');
      }

      $(this).data("clicks", !clicks);
    });
  })();
});
