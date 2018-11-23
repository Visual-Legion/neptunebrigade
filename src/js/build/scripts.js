'use strict';

if ($(".gmaps").length > 0) {
	var _require = require('./maps'),
	    gmaps = _require.gmaps;
}

var _require2 = require('./cookie'),
    cookie = _require2.cookie;

(function (root, $, undefined) {
	"use strict";

	$(function () {
		// DOM ready, take it away

		console.log("JS/JQ Ready v.7 ");

		/* Loader */
		$(window).load(function () {
			$(".loader").fadeOut("slow");
		});

		/* Hamburger menu */
		var hamburger = $("#hamburger-icon");
		hamburger.click(function () {
			hamburger.toggleClass("active");
			$(".navs_wrapper nav").toggleClass("tablet_menu_active");
			// return false;
		});

		/* Form button replacement */
		if (jQuery("form.wpcf7-form .button").length > 0) {
			jQuery("form.wpcf7-form .button").click(function () {
				console.log("submitting");
				$(this).closest("form").submit();
			});
		}

		/*Show more events*/

		setTimeout(function () {
			$('.more_events').click(function (e) {
				console.log("showing more events");
				e.preventDefault();
				$('.event.ninja').fadeIn();
				$('.more_events').css('left', '100%');
			});
			$('.more_photos').click(function (e) {
				console.log("showing more events");
				e.preventDefault();
				$('.album_thumb.ninja').fadeIn(function () {
					// $('.more_photos').fadeOut(() => {
					// 	console.log('slidup');
					// });
				});
				$('.more_photos').css('left', '100%');
			});
		}, 10);

		/* Magnific popup */
		// $('.photo_gallery .photo').magnificPopup({
		// 	delegate: 'a', // child items selector, by clicking on it popup will open
		// 	type: 'image'
		// // other options
		// });

		$('.photo_gallery .photo a').magnificPopup({
			type: 'image',

			gallery: {
				enabled: true,
				preload: [0, 2], // read about this option in next Lazy-loading section

				navigateByImgClick: true,

				arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button

				tPrev: 'Previous (Left arrow key)', // title for left button
				tNext: 'Next (Right arrow key)', // title for right button
				tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
			}
		});

		/* Smooth anchor scroll from css-tricks */
		// Select all links with hashes
		$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]').not('[href="#0"]').click(function (event) {
			// On-page links
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				// Figure out element to scroll to
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 1000, function () {
						// Callback after animation
						// Must change focus!
						var $target = $(target);
						$target.focus();
						if ($target.is(":focus")) {
							// Checking if the target was focused
							return false;
						} else {
							$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
							$target.focus(); // Set focus again
						}
						;
					});
				}
			}
		});
	});
})(undefined, jQuery);