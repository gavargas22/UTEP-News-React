<?php
	// No direct access
	defined('_JEXEC') or die;

	$doc = JFactory::getDocument();
	// Load the CSS Styling for the News Module
	$doc->addStyleSheet($url = JUri::root() . 'media/mod_utepnews/assets/css/utep-news.css');
	// Load React JS with Addons
	$doc->addScript($url = JUri::root() . 'media/mod_utepnews/assets/react/react-with-addons.js');
	// Load the JSX to JS transformer
	$doc->addScript($url = JUri::root() . 'media/mod_utepnews/assets/react/JSXTransformer.js');
	 // Load the JSX for News in the head of document
	$doc->addScript($url = JUri::root() . 'media/mod_utepnews/assets/jsx/news.jsx', $type = "text/jsx");
	// Load the JSX for the Events component
	$doc->addScript($url = JUri::root() . 'media/mod_utepnews/assets/jsx/events.jsx', $type = "text/jsx");
?>

<div class="container-fluid no-padding center-custom-tabs-wrapper">
	<div class="container-fluid center-tabs-background">
		<div class="container">
			<ul class="nav nav-tabs center-custom-nav-tabs" role="tablist">
				<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">NEWS</a></li>
				<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">EVENTS</a></li>
				<li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">MAJORS &amp; PROGRAMS</a></li>
			</ul>
		</div>
	</div>

	<div class="container news-content">
		<div id="loading-graphic" style="text-align:center;height:100px;font-weight:bold;font-size:20px;">
			<img src="<?php echo JUri::root() . 'media/mod_utepnews/assets/images/loading.gif'; ?>"/>
			<h4>Loading</h4>
		</div>
		<div class="tab-content">
			<div role="tabpanel" class="tab-pane active" id="home">
				<div id="news-content"></div>
				<div class="bottom-btn">
					<a href="http://news.utep.edu" class="btn btn-primary btn-more btn-sm" role="button">More News</a>
				</div>
			</div>
			<div role="tabpanel" class="tab-pane" id="profile">
				<h1 style="color:#ff8200;text-align:center;">LATEST EVENTS</h1>
				<div id="events-content"></div>
			</div>
			<div role="tabpanel" class="tab-pane" id="messages">...</div>
		</div>

	</div>
</div>
