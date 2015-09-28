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
		// render();
	},
	togglePrev: function() {
		console.log("Previous Button Triggered");
		var current = slideState.currentSlide;
		var prev = current - 1;
		if (prev < 0) {
			prev = slideState.stories.length - 1;
		}
		slideState.currentSlide = prev;
		// render();
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
		// render();
	}
}

var NewsBox = React.createClass({
	loadNewsFromServer: function() {
		jQuery.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				var topNews =[], size = 2;
				topNews = data.slice(0, size);
				this.setState({data: topNews});
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
				<div className="col-sm-1 slide-control"><i className="fa fa-chevron-left left"></i></div>
				{slidesNodes}
				<div className="col-sm-1 slide-control"><i className="fa fa-chevron-right right"></i></div>
			</div>
		);
	}
});

var Article = React.createClass({
	render: function() {
		var classes = React.addons.classSet({
			'slide': true,
			'active': this.props.active
		});
		var classNames = "col-sm-5 item article-wrapper";
		if (this.props.active == true) {
			classNames += ' active';
		}
		var articleImageStyle = {
			backgroundImage: 'url(' + this.props.imagePath + ')',
			backgroundSize: 'cover'
		};
		return (
			<div className={classNames} >
				<a href={this.props.articleLink}>
					<div className="news-article-image" style={articleImageStyle}></div>
					<div className="article-title-text">{this.props.articleTitle}</div>
					<div className="article-title-excerpt" dangerouslySetInnerHTML={{__html: this.props.articleExcerpt}}></div>
				</a>
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



React.render( <NewsBox url="http://news.utep.edu/?rest_route=/wp/v2/posts" pollInterval={2000} />, document.getElementById('news-content') );



	// http://news.utep.edu/wp-json/wp/v2/posts/?filter[category]=2
	// http://news.utep.edu/?rest_route=/wp/v2/posts
