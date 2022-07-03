jQuery(window).on('load', function() {
  //On document ready remove spinner
  jQuery('#js-storybook-spinner').hide();
});

jQuery(document).ready(function($) {

  //Universal jQuery selectors
  const isiSideBarWrapper = $('.js-storybook-remove-isi');
  const body = $('body');
  const currentMode = $('#js-current-mode');
  //End universal jQuery selectors


  //Universal functions
  const currentModeBadgeText = currentModeName => currentMode.find('span').text(currentModeName);

  const globStoryBookScope = window.storybookGlobalFunctions;
  //End universal functions

  /*
  * @description In the storybook,
  * we generate only fake img, apart from the storybook folders,
  *  the paths are generated for the right graphics.
  *
  * Comment this function out if you want enable img in storybook.html
  * (please take a look also at scss @function file())
  */
  (function generateFakeUrl() {
    const fallbackImageUrl = "https://fakeimg.pl/2000x2000/?text=Fake_Img";
    let $div = $('div'),
      bg = $div.find(`[role='img']`);
    bg.css('background-image', `url(${fallbackImageUrl})`);
  })();

  const removeActiveSearchResultsClass = (olLiPrototype, visibleOlLiLength) => {
    const olLiLength = olLiPrototype.length;
    if (olLiLength === visibleOlLiLength) {
      olLiPrototype.removeClass("active-search-results");
    }
  };

  (function searchPrototype() {
    $("#js-searchbar").keyup(function() {
      const input = $('#js-searchbar').val().toLowerCase();
      let olLiPrototype = $('.js-prototype-name');

      for (let i = 0; i < olLiPrototype.length; i++) {
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

      const visibleOlLiLength = $('.js-prototype-name:visible').length;

      removeActiveSearchResultsClass(olLiPrototype, visibleOlLiLength);
    });
  })();


  (function smoothlyScrollToEveryAnchor() {

    globStoryBookScope.isStoryBook() && $(document).on('click',
      'a[href^="#"]',
      function(event) {
        event.preventDefault();

        //condition for empty link
        if ($.attr(this, 'href') !== '#') {
          $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 300
          }, 500);
        }

      }); // jshint ignore:line
  })();

  (function scrollToBottomOfThePage() {
    $("#js-scroll-down").click(function() {
      $('html, body').animate({ scrollTop: 999999 }, 300);
    });
  })();

  (function scrollToTOPOfThePage() {
    $("#js-scroll-up").click(function() {
      $('html, body').animate({ scrollTop: 'Opx' }, 300);
    });
  })();

  (function applyOneColumnLayout() {
    //onDocumentReady add specific class
    body.addClass('has-isi-side-bar');

    $("#js-apply-one-column-layout").click(function() {
      let clicks = $(this).data('clicks');
      if (clicks) {
        body.addClass('has-isi-side-bar');
        isiSideBarWrapper.show();
        currentModeBadgeText('Two Column');
      } else {
        body.removeClass('has-isi-side-bar');
        isiSideBarWrapper.hide();
        // for resizing slick parent div after hiding isi sidebar
        $('.carousel').slick('setDimensions');
        currentModeBadgeText('One Column');
      }
      $(this).data("clicks", !clicks);
    });

  })();
});
