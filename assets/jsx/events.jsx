var EventsBox = React.createClass({
	loadEventsFromServer: function() {
		jQuery.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				var topEvents =[], size = 2;
				topEvents = data.events.slice(0, size);
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
		setInterval(this.loadEventsFromServer, this.props.eventPollInterval);
	},
	render: function() {
		return (
			<EventsList data={this.state.data} />
		);
	}
});

var EventsList = React.createClass({
	render: function() {
		return (
			<div className="events-list">
				<EventSlides data={this.props.data}></EventSlides>
			</div>
		);
	}
});

var EventSlides = React.createClass({
	render: function() {
		var imageServerURLPrefix = "http://events.utep.edu/components/com_rseventspro/assets/images/events/";
		var defaultImageURL = "http://news.utep.edu/wp-content/uploads/2015/08/0825152MiningMinds_LT.gif";
		var eventNodes = this.props.data.map(function (evt, index) {
			if (evt.icon == null) {
				evt.imagePath = defaultImageURL;
				evt.featured_image_thumbnail_url = defaultImageURL;
			}
			return (
				<EventElement articleLink={evt.link} imagePath={imageServerURLPrefix.concat(evt.icon)} articleTitle={evt.name} articleExcerpt={evt.description} key={index}></EventElement>
			);
		});
		return(
			<div className="slides row">
				<div className="col-sm-1 slide-control"><i className="fa fa-angle-left left"></i></div>
				{eventNodes}
				<div className="col-sm-1 slide-control"><i className="fa fa-angle-right right"></i></div>
			</div>
		);
	}
});

var EventElement = React.createClass({
	render: function() {
		var classNames = "col-sm-5 item article-wrapper";
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



React.render( <EventsBox url="http://events.utep.edu/index.php?option=com_eventsjson&format=json" eventPollInterval={2000} />, document.getElementById('events-content') );



	// http://news.utep.edu/wp-json/wp/v2/posts/?filter[category]=2
	// http://news.utep.edu/?rest_route=/wp/v2/posts
