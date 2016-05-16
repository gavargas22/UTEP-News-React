// News Pagination
var paginateNews = function(){
  // Pagination of News Articles
  // Check to see if the element already has the slick class
  if (jQuery('.slides').hasClass('slick-initialized')) {
    jQuery('.slides').slick('setPosition');
    // Do nothing
  } else {
    // Otherwise, apply slick.
    // paginateEvents();
    jQuery('.slides').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 670,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '40px;',
          arrows: false

        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
      ]
    });
  }
  // Ellipsis
  jQuery(".article-title-excerpt").dotdotdot({
    //	configuration goes here
  });
}


// Events Pagination
var paginateEvents = function() {
  // Check to see if the element already has the slick class
  if (jQuery('.events-paginated').hasClass('slick-initialized')) {
    jQuery('.events-paginated').slick('setPosition');
  } else {
    // Otherwise, apply slick.
    jQuery('.events-paginated').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false
        }
      }, {
        breakpoint: 670,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
      ]
    });
  }
}
