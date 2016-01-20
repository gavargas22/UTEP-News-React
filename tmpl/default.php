<?php
	// No direct access
	defined('_JEXEC') or die;

	$doc = JFactory::getDocument();
	// Load the CSS Styling for the News Module
	$doc->addStyleSheet($url = JUri::root() . 'media/mod_utepnews/assets/css/utep-news.css');
	// Slick
	$doc->addStyleSheet($url = JUri::root() . 'media/mod_utepnews/assets/javascripts/slick/slick.css');
	$doc->addStyleSheet($url = JUri::root() . 'media/mod_utepnews/assets/javascripts/slick/slick-theme.css');
	// Load React JS with Addons
	$doc->addScript($url = JUri::root() . 'media/mod_utepnews/assets/react/react-with-addons.js');
	// Load the JSX to JS transformer
	$doc->addScript($url = JUri::root() . 'media/mod_utepnews/assets/react/JSXTransformer.js');
	 // Load the JSX for News in the head of document
	$doc->addScript($url = JUri::root() . 'media/mod_utepnews/assets/jsx/news.jsx', $type = "text/jsx");
	// Load the JSX for the Events component
	$doc->addScript($url = JUri::root() . 'media/mod_utepnews/assets/jsx/events.jsx', $type = "text/jsx");
	// Slick
	$doc->addScript($url = JUri::root() . 'media/mod_utepnews/assets/javascripts/slick/slick.min.js');
	$doc->addScript($url = JUri::root() . 'media/mod_utepnews/assets/javascripts/paginate.js');
?>

<div class="container-fluid no-padding center-custom-tabs-wrapper">
	<div class="container-fluid center-tabs-background">
		<div class="container">
			<ul class="nav nav-tabs center-custom-nav-tabs hidden-xs hidden-sm visible-md visible-lg" role="tablist">
				<li role="presentation" class="active"><a href="#news" aria-controls="home" role="tab" data-toggle="tab" class="home-information-tabs">NEWS</a></li>
				<li role="presentation"><a href="#events" aria-controls="profile" role="tab" data-toggle="tab" class="home-information-tabs">EVENTS</a></li>
				<li role="presentation"><a href="#majorsprograms" aria-controls="messages" role="tab" data-toggle="tab" class="home-information-tabs">ENGAGE</a></li>
			</ul>
			<?php //Responsive in cellphone code ?>
			<div class="nav-center visible-xs visible-sm hidden-md hidden-lg">
				<ul class="nav nav-tabs">
					<li role="presentation" class="active"><a href="#news" aria-controls="home" role="tab" data-toggle="tab" class="home-information-tabs"><span style="font-size:12px;font-weight:bold;">NEWS</span></a></li>
					<li role="presentation"><a href="#events" aria-controls="profile" role="tab" data-toggle="tab" class="home-information-tabs"><span style="font-size:12px;font-weight:bold;">EVENTS</span></a></li>
					<li role="presentation"><a href="#majorsprograms" aria-controls="messages" role="tab" data-toggle="tab" class="home-information-tabs"><span style="font-size:12px;font-weight:bold;">ENGAGE</span></a></li>
				</ul>
			</div>

			<!-- <ul class="nav nav-tabs center-custom-nav-tabs-responsive visible-xs visible-sm hidden-md hidden-lg" role="tablist">
				<li role="presentation" class="active"><a href="#news" aria-controls="home" role="tab" data-toggle="tab" class="home-information-tabs"><span style="font-size:12px;font-weight:bold;">NEWS</span></a></li>
				<li role="presentation"><a href="#events" aria-controls="profile" role="tab" data-toggle="tab" class="home-information-tabs"><span style="font-size:12px;font-weight:bold;">EVENTS</span></a></li>
				<li role="presentation"><a href="#majorsprograms" aria-controls="messages" role="tab" data-toggle="tab" class="home-information-tabs"><span style="font-size:12px;font-weight:bold;">MAJORS</span></a></li>
			</ul> -->
			<?php //End cellphone size ?>
		</div>
	</div>

	<div class="container news-content">
		<div id="loading-graphic" style="text-align:center;height:100px;font-weight:bold;font-size:20px;">
			<img src="<?php echo JUri::root() . 'media/mod_utepnews/assets/images/loading.gif'; ?>"/>
			<h4>Loading</h4>
		</div>
		<div class="tab-content utep-news-tab">
			<div role="tabpanel" class="tab-pane no-outline active" id="news">
				<div id="news-content"></div>
				<div class="bottom-btn">
					<a href="http://news.utep.edu"><p style="font-family:'Tungsten A', 'Tungsten B';font-size:20px;font-weight:700;text-transform:uppercase;>More News</p></a>
				</div>
			</div>
			<div role="tabpanel" class="tab-pane no-outline" id="events">
				<div id="events-content"></div>
			</div>
			<div role="tabpanel" class="tab-pane no-outline" id="majorsprograms">...</div>
		</div>

	</div>
</div>
