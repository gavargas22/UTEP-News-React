<?php defined('_JEXEC') or die; ?>

<?php
  $jsonData = file_get_content('http://news.utep.edu/?rest_route=/wp/v2/posts');
  $jsonData = json_decode($json);
  var_dump($data);
?>
<div class="col-lg-6">
		<h2 style="color: #ff8200; font-weight: bold; text-transform: uppercase;">Featured News</h2>
		<div class="orange-strip" style="width: 100px; height: 3px; margin-bottom: 30px;">&nbsp;</div>
		<div class="row" style="padding-left: 15px;">
			<div class="col-lg-6" style="background-color: #7a7a7a; height: 160px;">&nbsp;</div>
			<div class="col-lg-6">
				<div class="filter-article-title">Article Headline</div>
				<div class="filter-article-more" style="font-size:11px;">Pa explis atem esedi dolorumet, velit quo et aciati omnia simaximodit lam re, nessit abore ellate excepe.
					<div class="filter-article-more">
              <br>
            <a href="#" style="color:#B1B3B3; font-size:11px;">Read More &gt;</a>
					</div>
				</div>
			</div>
		</div>
		<div class="row" style="padding-top: 50px; padding-left: 15px;">
			<div class="col-lg-6" style="background-color: #7a7a7a; height: 160px;">&nbsp;</div>
			<div class="col-lg-6">
				<div class="filter-article-title">Article Headline</div>
				<div class="filter-article-more" style="font-size:11px;">Pa explis atem esedi dolorumet, velit quo et aciati omnia simaximodit lam re, nessit abore ellate excepe.

					<div class="filter-article-more">
            <br>
            <a href="#" class="filter-article-more" style="color:#B1B3B3; font-size:11px;">Read More &gt;</a>
					</div>
				</div>
			</div>
		</div>
		<div class="row" style="padding-top: 50px; padding-left: 15px;">
			<div class="col-lg-6" style="background-color: #7a7a7a; height: 160px;">&nbsp;</div>
			<div class="col-lg-6">
				<div class="filter-article-title">Article Headline</div>
				<div class="filter-article-more" style="font-size:11px;">Pa explis atem esedi dolorumet, velit quo et aciati omnia simaximodit lam re, nessit abore ellate excepe.

					<div class="filter-article-more">
          <br>
            <a href="#" class="filter-article-more" style="color:#B1B3B3; font-size:11px;">Read More &gt;</a>
					</div>
				</div>
			</div>
		</div>
<br>
<a class="btn btn-orange">More News</a>
</div>
