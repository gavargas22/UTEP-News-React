<?php
// No direct access
defined('_JEXEC') or die;

$doc = JFactory::getDocument();
JHtml::_('jquery.framework');
JHtml::_('stylesheet', JUri::root() . 'media/mod_utepnews/assets/css/utep-news.css');  // For CSS files
JHtml::_('script', JUri::root() . 'media/mod_utepnews/assets/react/react-with-addons.min.js');       // For JS files
JHtml::_('script', JUri::root() . 'media/mod_utepnews/assets/react/react.min.js');       // For JS files
JHtml::_('script', JUri::root() . 'media/mod_utepnews/assets/jsx/news.js');       // For JS files
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
		<div class="tab-content">
			<div role="tabpanel" class="tab-pane active" id="home">
				<div id="content"></div>
				<div class="bottom-btn">
					<a href="http://news.utep.edu" class="btn btn-primary btn-more btn-sm" role="button">More News</a>
				</div>
			</div>
			<div role="tabpanel" class="tab-pane" id="profile">...</div>
			<div role="tabpanel" class="tab-pane" id="messages">...</div>
		</div>

	</div>
</div>
