var EventsBox = React.createClass({displayName: "EventsBox",
	loadNewsFromServer: function() {
		jQuery.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				var topEvents =[], size = 2;
				topEvents = data.slice(0, size);
				this.setState({data: topEvents});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {loaded: false, data:[]};
	},
	componentDidMount: function() {
		this.loadEventsFromServer();
		setInterval(this.loadEventsFromServer, this.props.pollInterval);
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
		var defaultImageURL = "http://news.utep.edu/wp-content/uploads/2015/08/0825152MiningMinds_LT.gif";
		var slidesNodes = this.props.data.map(function (article, index) {
			if (article.featured_image_thumbnail_url == null) {
				article.imagePath = defaultImageURL;
				article.featured_image_thumbnail_url = defaultImageURL;
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
		var classes = React.addons.classSet({
			'slide': true,
			'active': this.props.active
		});
		var classNames = "col-sm-6 item article-wrapper";
		if (this.props.active == true) {
			classNames += ' active';
		}
		var articleImageStyle = {
			backgroundImage: 'url(' + this.props.imagePath + ')',
			backgroundSize: 'cover'
		};
		return (
			React.createElement("div", {className: classNames},
				React.createElement("a", {href: this.props.articleLink},
					React.createElement("div", {className: "news-article-image", style: articleImageStyle}),
					React.createElement("div", {className: "article-title-text"}, this.props.articleTitle),
					React.createElement("div", {className: "article-title-excerpt", dangerouslySetInnerHTML: {__html: this.props.articleExcerpt}})
				)
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


React.render( React.createElement(NewsBox, {url: "http://events.utep.edu/index.php?option=com_eventsjson&format=json", pollInterval: 2000}), document.getElementById('news-content') );



// http://news.utep.edu/wp-json/wp/v2/posts/?filter[category]=2
// http://news.utep.edu/?rest_route=/wp/v2/posts
