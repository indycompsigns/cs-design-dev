#!/usr/local/bin/php
<?php
	$titles = explode("|", $argv[1]);
	$id = $argv[2];
?>
<h2 class="freeopttitle"><?php echo $titles[0] ?></h2>
<div class="cs-enter-text"> 
	<span class="fa fa-arrow-right">
	</span>

<input type="text" name="freeoptinput" id="freeoptinput" />
<input type="hidden" name="<?php echo $id; ?>:freeopt" id="freeopt" />
<input type="hidden" name="freeoptstart" id="freeoptstart" value="<?php echo $titles[1]; ?>" />
</div>