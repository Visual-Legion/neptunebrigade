<div class="loader parent">
	<div class="content_wrapper child">
		<?php 
						$vl_option = vl_get_global_options();
						$header_logo_id = $vl_option['vl_header_logo'];
						?>
						<img src="<?php echo wp_get_attachment_url($header_logo_id) ?>">
		<div class="loader-05"></div>
	</div>
	<!-- <div class="utopia_wrapper">
		<div class="glitch" data-text="Loading">Loading</div> 
	</div> -->
</div>