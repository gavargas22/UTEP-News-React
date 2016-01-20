var slideState = {currentSlide:0, stories:[0,1,2,3,4,5,6,7,8,9]}

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

var NewsBox = React.createClass({
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
	    jQuery('.slides').slick({
		    dots: true,
				customPaging:function() { return '<a><img src="http://skunkworks.at.utep.edu/cdn/utep/rectangular12.png"></a>'; },
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
			<NewsList data={this.state.data} />
		);
	}
});

var NewsList = React.createClass({
	render: function() {
		return (
			<div className="newslist">
				<Slides data={this.props.data}></Slides>
			</div>
		);
	}
});

var Slides = React.createClass({
	render: function() {
		var defaultImageURL = "http://news.utep.edu/wp-content/uploads/2015/08/0825152MiningMinds_LT.gif";
		var slidesNodes = this.props.data.map(function (article, index) {
			if (article.featured_image_thumbnail_url == null) {
				article.imagePath = defaultImageURL;
				article.featured_image_thumbnail_url = defaultImageURL;
			}
			var isActive = slideState.currentSlide === index;
			return (
				<Article active={isActive} articleLink={article.link} imagePath={article.featured_image_thumbnail_url} articleTitle={article.title} articleExcerpt={article.excerpt.rendered} key={index}></Article>
			);
		});
		return(
			<div className="slides row">
				{slidesNodes}
			</div>
		);
	}
});

var Article = React.createClass({
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
			<div className={classNames} >
				<div className="news-article-image" style={articleImageStyle}></div>
				<div className="orange-strip" style={orangeStripCustomStyle}></div>
				<div className="article-title-text">{this.props.articleTitle}</div>
				<div className="article-more-button"><a href={this.props.articleLink}>READ MORE &gt;</a></div>
			</div>
		)
	}
});
//////////////////////////////////////////////////////

var EmptyMessage = React.createClass({
	render: function() {
		return (
			<div className="empty-message">No Data</div>
		);
	}
});



React.render( <NewsBox url="http://news.utep.edu/?rest_route=/wp/v2/posts" pollInterval={20000} />, document.getElementById('news-content') );



	// http://news.utep.edu/wp-json/wp/v2/posts/?filter[category]=2
	// http://news.utep.edu/?rest_route=/wp/v2/posts
