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
        var topNews =[], size = 3;
        topNews = data.slice(0, size);
        this.setState({data: topNews});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data:[], currentSlide: 0};
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
    var slidesNodes = this.props.data.map(function (article, index) {
      var isActive = slideState.currentSlide === index;
      return (
        <Article active={isActive} articleLink={article.link} imagePath={article.featured_image_thumbnail_url} articleTitle={article.title} key={index}></Article>
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
    return (
      <div className={classNames} >
        <a href={this.props.articleLink}>
          <div className="news-article-image" style={articleImageStyle}></div>
          <div className="article-title-text">{this.props.articleTitle}</div>
        </a>
      </div>
    )
  }
});
//////////////////////////////////////////////////////

// var Controls = React.createClass({
//   togglePrev: function() {
//     actions.togglePrev();
//   },
//   toggleNext: function() {
//     actions.toggleNext();
//   },
//   render: function() {
//     return (
//       <div className="controls">
//         <div className="toggle toggle-prev" onClick={this.togglePrev}>Previous</div>
//         <div className="toggle toggle-next" onClick={this.toggleNext}>Next</div>
//       </div>
//     );
//   }
// });

// var Pagination = React.createClass({
//   render: function() {
//     var paginationNodes = this.props.data.map(function (paginationNode, index) {
//       return (
//         <Pager id={paginationNode.id} key={paginationNode.id} title={paginationNode.index}>{paginationNode.index}</Pager>
//       );
//     });
//     return (
//       <div className="pagination">
//         {paginationNodes}
//       </div>
//     );
//   }
// });

// var Pager = React.createClass({
//   toggleSlide: function() {
//     actions.toggleSlide(this.props.id);
//   },
//   render: function() {
//     return (
//       <span className="pager" onClick={this.toggleSlide}>{this.props.title}</span>
//     );
//   }
// });

var EmptyMessage = React.createClass({
  render: function() {
    return (
      <div className="empty-message">No Data</div>
    );
  }
});


//
// function render() {
//   React.render(
//   <NewsBox url="http://news.utep.edu/?rest_route=/wp/v2/posts" pollInterval={2000} />,
//   document.getElementById('content')
//   );
// }

React.render( <NewsBox url="http://news.utep.edu/?rest_route=/wp/v2/posts" pollInterval={2000} />, document.getElementById('content') );

////////////////////////////////////////////////////////////
// var NewsList = React.createClass({
//   render: function() {
//     var articleNodes = this.props.data.map(function(article, index) {
//       return (
//         <div className="col-sm-4 active">
//           <a href={article.link} key={index}>
//             <div className="news-article-image"><img src={article.featured_image_thumbnail_url} className="img-responsive"/></div>
//             <div className="article-title-text">{article.title}</div>
//           </a>
//         </div>
//       );
//     });
//     return (
//       <div id="carousel-inner" className="commentList">
//         {articleNodes}
//       </div>
//     );
//   }
// });


  // var NewsList = React.createClass({
  //   render: function() {
  //     var articleNodes = this.props.data.map(function (article, index) {
  //       return (
  //         <Article title={article.title} articleImage={article.featured_image_thumbnail_url} key={index}>
  //           <a href={article.link}>
  //             <div className="news-article-image"><img src={article.featured_image_thumbnail_url} className="img-responsive"/></div>
  //             <div className="article-title-text">{article.title}</div>
  //           </a>
  //         </Article>
  //       );
  //     });
  //     return (
  //       <div className="articleList">
  //         {articleNodes}
  //       </div>
  //     );
  //   }
  // });

  // var Article = React.createClass({
  //   render: function() {
  //     var rawMarkup = this.props.children;
  //     return (
  //       <div className="col-sm-4 news-title item">
  //         {rawMarkup}
  //       </div>
  //     );
  //   }
  // });


  // http://news.utep.edu/wp-json/wp/v2/posts/?filter[category]=2
  // http://news.utep.edu/?rest_route=/wp/v2/posts
