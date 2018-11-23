<?php 
	get_header(); 
	$images = get_field('images');
?>

	<main role="main" aria-label="Content">
		<!-- section -->
		<?php if( $images ):  ?>
			<section class="photo_gallery">
				<h1><?php echo get_field('title'); ?></h1>
				<h2><?php echo get_field('location'); ?></h2>
				<?php //var_dump($images); ?>
				<div class="album">
					<?php 
					foreach ($images as $image) {
						?>
						<div class="photo link">
							<img class="mimage" src="<?php echo $image['url'] ?>">
							<a class="fa fa-search" href="<?php echo $image['url'] ?>"></a>
						</div>
						<?php
					}
					?>
				</div> 
			</section>	
			<?php endif; ?>	
	</main>

<?php get_footer(); ?>
