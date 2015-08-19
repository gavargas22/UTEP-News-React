<?php
// No direct access
defined('_JEXEC') or die;

// $document = & JFactory::getDocument();
//
// $document->addStyleSheet("modules/mod_utepnews/assets/css/utep-news.css");
// $document->addScript('modules/mod_utepnews/assets/jsx/news.jsx');
?>

<div class="container-fluid no-padding center-custom-tabs-wrapper">
  <div class="container">

    <ul class="nav nav-tabs center-custom-nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">NEWS</a></li>
      <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">EVENTS</a></li>
      <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">MAJORS &amp; PROGRAMS</a></li>
    </ul>

    <div class="tab-content">
      <div role="tabpanel" class="tab-pane active" id="home">
        <div id="content"></div>
      </div>
      <div role="tabpanel" class="tab-pane" id="profile">...</div>
      <div role="tabpanel" class="tab-pane" id="messages">...</div>
    </div>

  </div>
</div>
