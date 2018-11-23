			<!-- footer -->
			<?php 
				//$footer = get_field('footer','option');
				// $vl_option = vl_get_global_options();
				// $footer_logo_id = $vl_option['vl_footer_logo'];

			?>



			<footer class="footer" role="contentinfo">
				<div class="footer_wrapper">
					<?php 
					$vl_option = vl_get_global_options();
					$header_logo_id = $vl_option['vl_header_logo'];
					?>
					<div class="logo_wrapper link">
						<a href="#"></a>
						<img class="logo" src="<?php echo wp_get_attachment_url($header_logo_id) ?>">
					</div>
					<div class="text_wrapper">
					</div>
					<hr>
					<div class="text_wrapper">
						<div class="icons_wrapper">
							<a href="https://www.instagram.com/neptunebrigade/"><i class="fa fa-instagram" aria-hidden="true"></i></a>
							<a href="https://www.facebook.com/Neptune-Brigade-602979003420992/"><i class="fa fa-facebook" aria-hidden="true"></i></a>
							<!-- <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a> -->
						</div>
					</div>
				</div>
				<!-- copyright -->
				<!-- <div class="copyright"> -->
					<!-- <div class="line"></div> -->
					<!--  -->
					<!-- <p>Designed by <a href="https://visual-legion.com">Visual Legion, 2018</a></p>
				</div> -->
				<!-- /copyright -->
			</footer>
			<!-- /footer -->

		</div>
		<!-- /wrapper -->
		<?php //include 'cookie.php'; ?>

		<?php wp_footer(); ?>

		<!-- analytics -->
		<script>
		(function(f,i,r,e,s,h,l){i['GoogleAnalyticsObject']=s;f[s]=f[s]||function(){
		(f[s].q=f[s].q||[]).push(arguments)},f[s].l=1*new Date();h=i.createElement(r),
		l=i.getElementsByTagName(r)[0];h.async=1;h.src=e;l.parentNode.insertBefore(h,l)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-XXXXXXXX-XX', 'yourdomain.com');
		ga('send', 'pageview');
		</script>

	</body>
</html>
