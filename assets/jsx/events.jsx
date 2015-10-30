// Months Array
var months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

var EventsBox = React.createClass({
	loadEventsFromServer: function() {
		jQuery.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				var topEvents =[], size = 4;
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
		var defaultImageURL = "http://news.utep.edu/wp-content/uploads/2015/08/0825152MiningMinds_LT.gif";
		var eventNodes = this.props.data.map(function (evt, index) {
			if (evt.icon == null) {
				evt.imagePath = defaultImageURL;
				evt.featured_image_thumbnail_url = defaultImageURL;
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
		var classNames = "col-sm-3 item";
		var articleImageStyle = {
			backgroundImage: 'url(' + this.props.imagePath + ')',
			backgroundSize: 'cover'
		};
		return (
			<div className={classNames} >
				<a href={this.props.articleLink}>
					<div className="alert alert-default calendar-card" role="alert">
						<div className="event-date-day">{new Date(Date.parse(this.props.articleStartDay)).getDate()}</div>
						<div className="event-date-month">{months[new Date(Date.parse(this.props.articleStartMonth)).getMonth()]}</div>
						<div className="event-date-title">{this.props.articleTitle}</div>
					</div>
				</a>
			</div>
		)
	}
});
//////////////////////////////////////////////////////"2015-10-10 06:00:00"



React.render( <EventsBox url="http://events.utep.edu/index.php?option=com_eventsjson&format=json" eventPollInterval={2000} />, document.getElementById('events-content') );



	// http://news.utep.edu/wp-json/wp/v2/posts/?filter[category]=2
	// http://news.utep.edu/?rest_route=/wp/v2/posts
