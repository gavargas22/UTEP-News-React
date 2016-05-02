
// State transitions
var actions = {
  toggleNext: function() {
    console.log("Next Button Triggered");
    var current = slideState.currentSlide;
    var next = current + 1;
    if (next > slideState.stories.length - 1) {
      next = 0;
    }
    slideState.currentSlide = next;
    render();
  },
  togglePrev: function() {
    console.log("Previous Button Triggered");
    var current = slideState.currentSlide;
    var prev = current - 1;
    if (prev < 0) {
      prev = slideState.stories.length - 1;
    }
    slideState.currentSlide = prev;
    render();
  },
  toggleSlide: function(id) {
    console.log("Slide Toggle");
    var index = slideState.stories.map(function (el) {
      return (
        el.id
      );
    });
    var currentIndex = index.indexOf(id);
    slideState.currentSlide = currentIndex;
    render();
  }
}

var NewsBox = React.createClass({displayName: "NewsBox",
  loadNewsFromServer: function() {
    jQuery.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      beforeSend: function() {
      },
      success: function(data) {
        var topNews =[], size = 9;
        topNews = data.slice(0, size);
        this.setState({data: topNews, pageNum: 1});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {loaded: false, data:[], currentSlide: 0};
  },
  componentDidMount: function() {
    this.loadNewsFromServer();
    setInterval(this.loadNewsFromServer, this.props.pollInterval);
  },
  componentDidUpdate: function() {
    // Pagination of News Articles
    // Check to see if the element already has the slick class
    if (jQuery('.slides').hasClass('slick-initialized')) {
      // Do nothing
    } else {
      // Otherwise, apply slick.
      paginateEvents();
      jQuery('.slides').slick({
        dots: true,
        customPaging:function(slider, i) {
          console.log(slider.slideCount);
          if (slider.slideCount == i) {
            return '<a><img src="http://cdn.bulbagarden.net/upload/3/33/Spr_3f_151.png"></a>';
          } else if (slider.slideCount != i) {
            return '<a><img src="http://skunkworks.at.utep.edu/cdn/utep/rectangular12.png"></a>';
          }
        },
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
    // Ellipsis
    jQuery(".article-title-excerpt").dotdotdot({
      //	configuration goes here
    });
  },
  render: function() {
    return (
      React.createElement(NewsList, {data: this.state.data})
    );
  }
});

var NewsList = React.createClass({displayName: "NewsList",
  render: function() {
    return (
      React.createElement("div", {className: "newslist"}, 
        React.createElement(Slides, {data: this.props.data})
      )
    );
  }
});

var Slides = React.createClass({displayName: "Slides",
  render: function() {
    var defaultImageURL = "http://skunkworks.at.utep.edu/cdn/utep/defaultimages/news/";
    // Array of names for the various images
    var defaultImages = ["1.jpg", "2.jpg"];
    var nextImage = 0;
    var slidesNodes = this.props.data.map(function (article, index) {
      if (article.featured_image_thumbnail_url == null) {
        article.featured_image_thumbnail_url = defaultImageURL + defaultImages[nextImage++];
        if(nextImage > 1) {
          nextImage = 0;
        }
      }
      var isActive = slideState.currentSlide === index;
      return (
        React.createElement(Article, {active: isActive, articleLink: article.link, imagePath: article.featured_image_thumbnail_url, articleTitle: article.title, articleExcerpt: article.excerpt.rendered, key: index})
      );
    });
    return(
      React.createElement("div", {className: "slides row"}, 
        slidesNodes
      )
    );
  }
});

var Article = React.createClass({displayName: "Article",
  render: function() {
    // Hide the loading graphic
    jQuery('#loading-graphic').addClass('hidden');
    jQuery('.slide-control').removeClass('hidden');
    var classes = React.addons.classSet({
      'slide': true,
      'active': this.props.active
    });
    var classNames = "col-sm-4 item article-wrapper";
    if (this.props.active == true) {
      classNames += ' active';
    }
    var articleImageStyle = {
      backgroundImage: 'url(' + this.props.imagePath + ')',
      backgroundSize: 'cover'
    };
    var orangeStripCustomStyle = {
      'width': 65,
      'height': 2,
      'marginTop': 15,
      'marginLeft': 15
    };
    return (
      React.createElement("div", {className: classNames}, 
        React.createElement("div", {className: "news-article-image", style: articleImageStyle}), 
        React.createElement("div", {className: "orange-strip", style: orangeStripCustomStyle}), 
        React.createElement("div", {className: "article-title-text"}, this.props.articleTitle), 
        React.createElement("div", {className: "article-more-button"}, React.createElement("a", {href: this.props.articleLink}, "READ MORE >"))
      )
    )
  }
});
//////////////////////////////////////////////////////

var EmptyMessage = React.createClass({displayName: "EmptyMessage",
  render: function() {
    return (
      React.createElement("div", {className: "empty-message"}, "No Data")
    );
  }
});



React.render( React.createElement(NewsBox, {url: "http://news.utep.edu/?rest_route=/wp/v2/posts", pollInterval: 3600}), document.getElementById('news-content') );



  // http://news.utep.edu/wp-json/wp/v2/posts/?filter[category]=2
  // http://news.utep.edu/?rest_route=/wp/v2/posts