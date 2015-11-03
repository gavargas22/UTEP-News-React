<?php
	// No direct access
	defined('_JEXEC') or die;

	// $doc = JFactory::getDocument();
	// // Load the CSS Styling for the News Module
	// $doc->addStyleSheet($url = JUri::root() . 'media/mod_utepnews/assets/css/utep-news.css');
	// // Load React JS with Addons
	// $doc->addScript($url = JUri::root() . 'media/mod_utepnews/assets/react/react-with-addons.js');
	// // Load the JSX to JS transformer
	// $doc->addScript($url = JUri::root() . 'media/mod_utepnews/assets/react/JSXTransformer.js');
	//  // Load the JSX for News in the head of document
	// $doc->addScript($url = JUri::root() . 'media/mod_utepnews/assets/jsx/news.jsx', $type = "text/jsx");
	// // Load the JSX for the Events component
	// $doc->addScript($url = JUri::root() . 'media/mod_utepnews/assets/jsx/events.jsx', $type = "text/jsx");
?>

<?php
	$jsonPostsURL = 'http://news.utep.edu/?rest_route=/wp/v2/posts';

	$jsonData = file_get_contents($jsonPostsURL);
	$posts = json_decode($jsondata);
?>

<?php foreach ($articles as $article): ?>
  <div class="col-lg-4 news-article-element">
    <a href="<?php echo JUri::root().'index.php/news/'.$article->id.'-'.$article->alias;?>">
      <div class="feat-wide5-image left relative">
    		<div class="top-icons">
    			<i class="fa fa-comment"></i> <?php echo $article->hits; ?>
    		</div>
    		<div class="bottom-title">
  				<span class="news-headline-title">LEAD ARTICLE PRESS </span>
  				<div class="feature-title"><?php echo $article->title; ?></div>
    		</div>
  		 <img width="auto" height="auto" src="<?php echo $pictures->{'image_intro'} ?>" class="attachment-post-thumbnail" alt="UTEP News">
      </div>
    </a>
  </div>
<?php endforeach ?>

<h2 style="color: #ff8200; font-weight: bold; text-transform: uppercase;">Featured News</h2>
<div class="orange-strip" style="width: 100px; height: 3px; margin-bottom: 30px;">&nbsp;</div>

<?php $i = 0; ?>
<?php foreach ($posts as $post): ?>
	<?php if ($i < 3): ?>
		<div class="row" style="padding-left: 15px;">
			<div class="col-lg-6" style="background-color: #7a7a7a; height: 160px;">&nbsp;</div>
			<div class="col-lg-6">
				<div class="filter-article-title"><?php echo($post->title)?></div>
				<div class="filter-article-more" style="font-size: 11px;">Pa explis atem esedi dolorumet, velit quo et aciati omnia simaximodit lam re, nessit abore ellate excepe.
					<div class="filter-article-more"><br> <a href="#" style="color: #b1b3b3; font-size: 11px;">Read More &gt;</a></div>
				</div>
			</div>
		</div>
		<?php $i++ ?>
	<?php endif ?>
<?php else {
	break;
}
?>
