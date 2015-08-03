<?php
// No direct access
defined('_JEXEC') or die;

// $document = & JFactory::getDocument();
?>

<!-- UTEP Header Menu and Logo /////////////////////////////////////////////-->
<?php
  // create a new cURL resource
  $utepHeaderMenu = curl_init();
  // set URL and other appropriate options
  curl_setopt($utepHeaderMenu, CURLOPT_URL, "http://skunkworks.at.utep.edu/utep-header-menu.php");
  curl_setopt($utepHeaderMenu, CURLOPT_HEADER, 0);
  // grab URL and pass it to the browser
  curl_exec($utepHeaderMenu);
  // close cURL resource, and free up system resources
  curl_close($utepHeaderMenu);
?>
<!-- ///////////////////////////////////////////////////////////////////////////////////// -->
