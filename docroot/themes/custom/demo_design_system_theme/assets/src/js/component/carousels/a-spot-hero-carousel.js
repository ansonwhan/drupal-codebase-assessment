jQuery(document).ready(function($) {

  (function carouselBasicType() {
    const carouselInitializationSelector = '.carousel';
    const navInitializationSelector = '.carousel-nav';

    $(carouselInitializationSelector).slick({
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: navInitializationSelector,
    });

    $(navInitializationSelector).slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: carouselInitializationSelector,
      dots: false,
      arrows: false,
      centerMode: true,
      focusOnSelect: true
    });
  })();

  (function carouselSecondType() {
    $('.carousel-second-type').slick({
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    });
  })();

  (function carouselThirdType() {
    $('.carousel-third-type').slick({
      infinite: false,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: "<button class='custom-slick-prev slick-prev' aria-label='Previous' type='button'></button>",
      nextArrow: "<button class='custom-slick-next slick-next' aria-label='Next' type='button'></button>",
    });
  })();


  (function carouselFourthType() {
    $('.carousel-fourth-type').slick({
      infinite: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      focusOnSelect: false,
      prevArrow: "<button class='custom-slick-prev slick-prev' aria-label='Previous' type='button'></button>",
      nextArrow: "<button class='custom-slick-next slick-next' aria-label='Next' type='button'></button>"
    });
  })();

  (function carouselFifthType() {
    $('.carousel-fifth-type').slick({
      infinite: true,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: "<button class='custom-slick-prev slick-prev' aria-label='Previous' type='button'></button>",
      nextArrow: "<button class='custom-slick-next slick-next' aria-label='Next' type='button'></button>"
    });
  })();

  (function carouselSixthType() {
    const carouselInitializationSelector = '.carousel-sixth-type';
    const navInitializationSelector = '.carousel-sixth-nav';

    $(carouselInitializationSelector).slick({
      infinite: true,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: "<button class='custom-slick-prev slick-prev' aria-label='Previous' type='button'></button>",
      nextArrow: "<button class='custom-slick-next slick-next' aria-label='Next' type='button'></button>",
      asNavFor: navInitializationSelector,
    });

    $(navInitializationSelector).slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: carouselInitializationSelector,
      dots: false,
      arrows: false,
      centerMode: true,
      focusOnSelect: true
    });
  })();

  (function carouselSeventhType() {
    const carouselInitializationSelector = '.carousel-seventh-type';
    const navInitializationSelector = '.carousel-seventh-nav';

    $(carouselInitializationSelector).slick({
      infinite: true,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: "<button class='custom-slick-prev slick-prev' aria-label='Previous' type='button'></button>",
      nextArrow: "<button class='custom-slick-next slick-next' aria-label='Next' type='button'></button>",
      asNavFor: navInitializationSelector,
    });

    $(navInitializationSelector).slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: carouselInitializationSelector,
      dots: false,
      arrows: false,
      centerMode: true,
      focusOnSelect: true
    });
  })();


  (function carouselEighthType() {
    const carouselInitializationSelector = '.carousel-eighth-type';
    const navInitializationSelector = '.carousel-eighth-nav';

    $(carouselInitializationSelector).slick({
      infinite: true,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: "<button class='custom-slick-prev slick-prev' aria-label='Previous' type='button'></button>",
      nextArrow: "<button class='custom-slick-next slick-next' aria-label='Next' type='button'></button>",
      asNavFor: navInitializationSelector,
    });

    $(navInitializationSelector).slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: carouselInitializationSelector,
      dots: false,
      arrows: false,
      centerMode: true,
      focusOnSelect: true
    });
  })();

});




