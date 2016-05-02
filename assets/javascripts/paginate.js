// News Pagination
var paginateNews = function(){
  // Check to see if the element already has the slick class
  if (jQuery('.slides').hasClass('slick-initialized')) {
    // Do nothing
  } else {
    // Otherwise, apply slick.
    jQuery('.slides').slick({
      dots: true,
      // customPaging:function(slider, i) {
      //   console.log(slider.slideCount);
      //   if (slider.slideCount == i) {
      //     return '<a><img src="http://cdn.bulbagarden.net/upload/3/33/Spr_3f_151.png"></a>';
      //   } else if (slider.slideCount != i) {
      //     return '<a><img src="http://skunkworks.at.utep.edu/cdn/utep/rectangular12.png"></a>';
      //   }
      // },
      infinite: false,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 480,
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
}

// Events Pagination
var paginateEvents = function(){
  // Check to see if the element already has the slick class
  if (jQuery('.events-paginated').hasClass('slick-initialized')) {
    // Do nothing
  } else {
    // Otherwise, apply slick.
    jQuery('.events-paginated').slick({
      dots: true,
      // customPaging:function() { return '<a><img src="http://skunkworks.at.utep.edu/cdn/utep/rectangular12.png"></a>'; },
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
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
      ]
    });
  }
}
