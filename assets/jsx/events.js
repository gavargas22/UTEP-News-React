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

// Initialize TimezoneJS
timezoneJS.timezone.zoneFileBasePath = '/tz';

var EventsBox = React.createClass({displayName: "EventsBox",
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
      React.createElement(EventsList, {data: this.state.data})
    );
  }
});

var EventsList = React.createClass({displayName: "EventsList",
  render: function() {
    return (
      React.createElement("div", {className: "events-list"}, 
        React.createElement(EventSlides, {data: this.props.data})
      )
    );
  }
});

var EventSlides = React.createClass({displayName: "EventSlides",
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
      // Conversion to Mountain time
      var timeFromJSON = new Date(evt.start);
      // Get the offset caused by PHP
      var offsetCausedByPHPModuleInHours = (timeFromJSON.getTimezoneOffset())/60;
      // Convert the UTC parsed time to milliseconds then substract the offset in milliseconds.
      var compensatedEventDate = new Date(timeFromJSON.getTime() - (offsetCausedByPHPModuleInHours * 60 * 60 * 1000));
      // Assign new date to the event object
      console.log(compensatedEventDate);
      evt.start = compensatedEventDate;
      return (
        React.createElement(EventElement, {articleLink: eventURLPrefix.concat(evt.id), imagePath: "'" + evt.icon + "'", articleTitle: evt.name, articleExcerpt: evt.description, articleId: evt.id, articleStartDay: evt.start, articleStartMonth: evt.start, key: index})
      );
    });
    return(
      React.createElement("div", {className: "row events-paginated"}, 
        eventNodes
      )
    );
  }
});

var EventElement = React.createClass({displayName: "EventElement",
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

      React.createElement("div", {className: classNames}, 

        React.createElement("div", {className: "col-lg-12 event-icon", style: articleImageStyle}, 
          React.createElement("div", {className: "picture-date-wrapper"}, 
            React.createElement("div", {className: "event-date-month"}, months[this.props.articleStartMonth.getMonth()]), 
            React.createElement("div", {className: "event-date-day"}, this.props.articleStartDay.getDate())
          )
        ), 
        React.createElement("div", {className: "orange-strip", style: orangeStripCustomStyle}), 
        React.createElement("div", {className: "event-title-text"}, this.props.articleTitle), 
        React.createElement("div", {className: "event-more-button"}, React.createElement("a", {href: this.props.articleLink}, "READ MORE >"))

      )
    )
  }
});
//////////////////////////////////////////////////////



React.render( React.createElement(EventsBox, {url: "http://events.utep.edu/index.php?option=com_eventsjson&format=json", eventPollInterval: 30000}), document.getElementById('events-content') );



  // http://news.utep.edu/wp-json/wp/v2/posts/?filter[category]=2
  // http://news.utep.edu/?rest_route=/wp/v2/posts