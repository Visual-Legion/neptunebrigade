// if ($(".gmaps").length > 0) {
// 	const {gmaps} = require('./maps');
// }

const {cookie} = require('./cookie');
// const {contact} = require('./contact');

(function(root, $, undefined) {
"use strict";

$(() => {
	// DOM ready, take it away 

	console.log("JS/JQ Ready v.8 ");

	/* Loader */
	$(window).load(function() {
		$(".loader").fadeOut("slow");
	});

	function getDegNumber(string) {

		var deg = '';
		var index = string.indexOf('deg') - 1;
		var isnumber = true;

		// while charAt is a number
		while (isnumber) {
			// console.log('in while loop');
			if (!isNaN(string.charAt(index))) {
				deg = string.charAt(index) + deg;
				--index;
			} else {
				// console.log(string.charAt(index) + 'is nan');
				isnumber = false;
			}

		}
		return deg;
	}

	/******************/
	/* Hamburger menu */
	/******************/

	var hamburger = $("#hamburger-icon");
	hamburger.click((e) => {
		e.preventDefault();
		hamburger.toggleClass("active");
		$(".navs_wrapper nav").toggleClass("tablet_menu_active");
	// return false;
	});


	/**************/
	/* Pagepiling */
	/**************/

	// if ($('#pagepiling') && matchMedia('only screen and (min-width: 768px)').matches) {
	// 	$('#pagepiling').pagepiling({
	// 		verticalCentered: false,
	// 		css3: false,
	// 		menu: 'nav ul',
	// 		anchors: ['view_top', 'view_design', 'view_development', 'view_seo', 'view_extras', 'view_startup', 'view_contact', 'view_footer'],
	// 		navigation: {
	// 			'textColor': '#fff',
	// 			'bulletsColor': '#fff',
	// 			'position': 'left',
	// 		// 'tooltips': ['Top', 'Design', 'Development', 'SEO', 'Extras', 'Startup', 'Contact']
	// 		},
	// 		onLeave: function(index, nextIndex, direction) {
	// 			//fading out the text of the leaving section
	// 			$('.section').eq(index - 1).find('h1, p, .button, input, textarea, label, span').fadeOut(700, 'easeInQuart');
	// 			// $('.section').eq(nextIndex - 1).find('.slide-up, .slide-down, .slide-left, .slide-right').removeClass('slid');

	// 			//fading in the text of the destination (in case it was fadedOut)
	// 			$('.section').eq(nextIndex - 1).find('h1, p, .button, input, textarea, label, span').fadeIn(700, 'easeInQuart');
	// 			// $('.section').eq(nextIndex - 1).find('.slide-up, .slide-down, .slide-left, .slide-right').addClass('slid');
	// 			setTimeout(function() {
	// 				// $('.wpml-ls-current-language a').css('background-image', $('li.active a').css('background-image'));
	// 				switchLangBackgroundToActiveBackgroundGradient();
	// 			}, 100);
	// 		// switchLangBackgroundToActiveBackgroundGradient();
	// 		},

	// 	});

	// 	$(".footer_wrapper").clone().appendTo(".view_footer");
	// 	$(".copyright").clone().appendTo(".view_footer");

	// 	$('.scroll_down').click(() => {
	// 		$.fn.pagepiling.moveSectionDown();
	// 	});

	// 	//pbly better way
	// 	//checking for pagepiling menu
	// 	var list = $('nav ul li');
	// 	Array.prototype.forEach.call(list, element => {
	// 		// console.log(element)
	// 		var classList = $(element).attr('class').split(/\s+/);
	// 		// console.log('classList', classList);

	// 		var anchor = false;

	// 		classList.forEach(classElement => {
	// 			if (classElement.indexOf('menu_') != -1) {
	// 				anchor = classElement.replace("menu_", "view_");
	// 			// console.log('anchor', anchor);
	// 			}
	// 		})

	// 		if (anchor) {
	// 			$(element).attr('data-menuanchor', anchor);
	// 		}
	// 	});

	// 	var current_active_from_url = window.location.href.split('/');
	// 	if (current_active_from_url[3] && current_active_from_url[3].indexOf('#') != -1) { // has anchor
	// 		$('.navs_wrapper li a[href="/' + current_active_from_url[3] + '"]').parent().addClass('active');
	// 	}

	// }


	/********************/
	/* Show more events */
	/********************/

	// setTimeout(() => {
	// 	$('.more_events').click((e) => {
	// 		console.log("showing more events");
	// 		e.preventDefault();
	// 		$('.event.ninja').fadeIn();
	// 		$('.more_events').css('left', '100%');
	// 	});
	// 	$('.more_photos').click((e) => {
	// 		console.log("showing more events");
	// 		e.preventDefault();
	// 		$('.album_thumb.ninja').fadeIn(() => {
	// 			// $('.more_photos').fadeOut(() => {
	// 			// 	console.log('slidup');
	// 			// });
	// 		});
	// 		$('.more_photos').css('left', '100%');
	// 	});
	// }, 10);


	/* Smooth anchor scroll from css-tricks */
	// Select all links with hashes
	// $('a[href*="#"]')
	// 	// Remove links that don't actually link to anything
	// 	.not('[href="#"]')
	// 	.not('[href="#0"]')
	// 	.click(function(event) {
	// 		// On-page links
	// 		if (
	// 				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
	// 				&&
	// 				location.hostname == this.hostname
	// 		) {
	// 			// Figure out element to scroll to
	// 			var target = $(this.hash);
	// 			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	// 			// Does a scroll target exist?
	// 			if (target.length) {
	// 				// Only prevent default if animation is actually gonna happen
	// 				event.preventDefault();
	// 				$('html, body').animate({
	// 					scrollTop: target.offset().top
	// 				}, 1000, function() {
	// 					// Callback after animation
	// 					// Must change focus!
	// 					var $target = $(target);
	// 					$target.focus();
	// 					if ($target.is(":focus")) { // Checking if the target was focused
	// 						return false;
	// 					} else {
	// 						$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
	// 						$target.focus(); // Set focus again
	// 					}
	// 					;
	// 				});
	// 			}
	// 		}
	// 	});

});
})(undefined, jQuery);

