<?php /* Template Name: Contact */ ?>

<?php get_header(); ?>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvpskDCkpWoZwNDxrVwW9diLUVkpbI8jM"></script>

	<main role="main" aria-label="Content">
		<!-- section -->

		<section class="contact_section">

			<?php
				$left_section = get_field('left_section');
				// var_dump($left_section);
				if ($left_section):
			?>

			<div class="left_section">
				<div class="img_wrapper">
					<img src="<?php echo $left_section['image'] ?>">
				</div>
				<h3 class="title"><?php echo $left_section['title'] ?></h3>
				<div class="description">
					<?php echo $left_section['description'] ?>
				</div>
			</div>
 
			<?php endif; ?>

			<?php
				$right_section = get_field('right_section');
				// var_dump($right_section);
				if ($right_section):
			?>

			<div class="right_section">
				<h1 class="title"><?php echo $right_section['title'] ?></h1>
				<p class="description"><?php echo $right_section['description'] ?></p>
				<div class="form_wrapper">
					<?php echo $right_section['form'] ?>
				</div>
			</div>

			<?php endif; ?>

		</section> 

	</main>

<?php get_footer(); ?>
