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
        var topEvents =[], size = 9;
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
  componentDidUpdate: function() {
    jQuery('a[href="#events').on('click', function(){
      paginateEvents();
    });
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
    var defaultEventImageURL = "http://skunkworks.at.utep.edu/cdn/utep/defaultimages/events/";

    // Array of names for the various images
    var defaultEventImages = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
    var nextImage = 0;

    var eventNodes = this.props.data.map(function (evt, index) {
      if (evt.icon == "") {
        evt.icon = defaultEventImageURL + defaultEventImages[nextImage++];
        if (nextImage > 3) {
          nextImage = 0;
        }
      } else {
        evt.icon = imageServerURLPrefix.concat(evt.icon);
      }
      return (
        <EventElement articleLink={eventURLPrefix.concat(evt.id)} imagePath={"'" + evt.icon + "'"} articleTitle={evt.name} articleExcerpt={evt.description} articleId={evt.id} articleStartDay={evt.start} articleStartMonth={evt.start} key={index}></EventElement>
      );
    });
    return(
      <div className="row events-paginated">
        {eventNodes}
      </div>
    );
  }
});

var EventElement = React.createClass({
  render: function() {
    var classNames = "col-sm-4 item event-wrapper";
    var articleImageStyle = {
      backgroundImage: 'url(' + this.props.imagePath + ')',
      backgroundSize: 'cover'
    };
    var orangeStripCustomStyle = {
      'width': 65,
      'height': 2,
      'marginTop': 210,
      'marginLeft': 16
    };
    return (

      <div className={classNames} >

        <div className="col-lg-12 event-icon" style={articleImageStyle}>
          <div className="picture-date-wrapper">
            <div className="event-date-month">{months[new Date(Date.parse(this.props.articleStartMonth)).getMonth()]}</div>
            <div className="event-date-day">{new Date(Date.parse(this.props.articleStartDay)).getDate()}</div>
          </div>
        </div>
        <div className="orange-strip" style={orangeStripCustomStyle}></div>
        <div className="event-title-text">{this.props.articleTitle}</div>
        <div className="event-more-button"><a href={this.props.articleLink}>READ MORE &gt;</a></div>

      </div>
    )
  }
});
//////////////////////////////////////////////////////



React.render( <EventsBox url="http://events.utep.edu/index.php?option=com_eventsjson&format=json" eventPollInterval={3} />, document.getElementById('events-content') );



  // http://news.utep.edu/wp-json/wp/v2/posts/?filter[category]=2
  // http://news.utep.edu/?rest_route=/wp/v2/posts
