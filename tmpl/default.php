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
	$posts = json_decode($jsonData, true);
?>

<h2 style="color: #ff8200; font-weight: bold; text-transform: uppercase;">Featured News</h2>
<div class="orange-strip" style="width: 100px; height: 3px; margin-bottom: 30px;">&nbsp;</div>

<?php
$i = 0;
$post_image = "";
?>
<div class="row" style="padding-left: 15px;">
<?php foreach ($posts as $post): ?>
	<?php
		if ($post["featured_image_thumbnail_url"] == "") {
			$post_image = "http://news.utep.edu/wp-content/uploads/2015/08/0825152MiningMinds_LT.gif";
		} else {
			$post_image = $post["featured_image_thumbnail_url"];
		}
	?>
	<?php if ($i < 3) { ?>

		<div class="col-lg-12 no-padding" style="margin-bottom:20px;">
			<div class="col-lg-6" style="background-image:url(<?php echo($post_image);?>);background-size:cover;background-position:50% 50%;height: 160px;">&nbsp;</div>
			<div class="col-lg-6">
				<div class="filter-article-title"><?php echo($post["title"]["rendered"]);?></div>
				<?php
				$excerpt = $post["excerpt"]["rendered"];
				if (strlen($excerpt) > 250) {
					$excerpt = substr($excerpt, 0, 100) . '...';
				}
				?>
				<div class="filter-article-more" style="font-size: 11px;"><?php echo($excerpt);?>
					<div class="filter-article-more"><br> <a href="<?php echo($post['link']); ?>" style="color: #b1b3b3; font-size: 11px;">Read More &gt;</a></div>
				</div>
			</div>
		</div>
		<?php $i++ ?>
		<?php } else {
			break;
		} ?>
<?php endforeach;?>
</div>
