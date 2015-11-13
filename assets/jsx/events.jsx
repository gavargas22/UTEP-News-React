// Months Array
var months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];

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
		var eventsRowStyle = {
			marginLeft: 160,
			marginRight: 160
		};
		var imageServerURLPrefix = "http://events.utep.edu/components/com_rseventspro/assets/images/events/";
		var eventURLPrefix = "http://events.utep.edu/index.php/event/";
		var defaultImageURL = "http://dev.utep.edu/media/mod_utepnews/assets/images/default.jpg";
		var eventNodes = this.props.data.map(function (evt, index) {
			if (evt.icon == "") {
				evt.icon = "default.png";
			}
			return (
				<EventElement articleLink={eventURLPrefix.concat(evt.id)} imagePath={imageServerURLPrefix.concat(evt.icon)} articleTitle={evt.name} articleExcerpt={evt.description} articleId={evt.id} articleStartDay={evt.start} articleStartMonth={evt.start} key={index}></EventElement>
			);
		});
		return(
			<div className="row" style={eventsRowStyle}>
				{eventNodes}
			</div>
		);
	}
});

var EventElement = React.createClass({
	render: function() {
		var classNames = "col-sm-6 item";
		var articleImageStyle = {
			backgroundImage: 'url(' + this.props.imagePath + ')',
			backgroundSize: 'cover'
		};
		var orangeStripCustomStyle = {
			'width': 65,
			'height': 2,
			'marginTop': 15
		};
		return (

			<div className={classNames} >
				<a href={this.props.articleLink}>

					<div className="col-lg-12 event-icon" style={articleImageStyle}>
						<div className="picture-date-wrapper">
							<div className="event-date-month">{months[new Date(Date.parse(this.props.articleStartMonth)).getMonth()]}</div>
							<div className="event-date-day">{new Date(Date.parse(this.props.articleStartDay)).getDate()}</div>
						</div>

						<div className="orange-strip" style={orangeStripCustomStyle}></div>
						<div className="article-title-text">{this.props.articleTitle}</div>

					</div>

				</a>
			</div>
		)
	}
});
//////////////////////////////////////////////////////



React.render( <EventsBox url="http://events.utep.edu/index.php?option=com_eventsjson&format=json" eventPollInterval={10000} />, document.getElementById('events-content') );



	// http://news.utep.edu/wp-json/wp/v2/posts/?filter[category]=2
	// http://news.utep.edu/?rest_route=/wp/v2/posts
