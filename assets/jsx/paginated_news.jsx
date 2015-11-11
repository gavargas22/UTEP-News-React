var NewsList = React.createClass({
  render: function() {
    return (
      <div className="newslist">
        <Slide data={this.props.data} active={true}></Slide>
      </div>
    );
  }
});

var Slide = React.createClass({
  render: function() {
    var numberOfSlides = 3;
    return (
      <Article></Article>
    );
  }
});
