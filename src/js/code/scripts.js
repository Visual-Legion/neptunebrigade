// if

const { gallery } = require("./gallery");
// const { tabSection } = require("./tabSection");
const { mailchimpForm } = require("./mailchiumpForm");
const { scroll } = require("./scroll");

(function(root, $, undefined) {
	"use strict";

	$(() => {
		// DOM ready, take it away
		console.log("DOM Ready V0.2 ");

		/**
		 * Mobile menu
		 */

		var hamburger = $("#hamburger-icon");
		hamburger.click(e => {
			e.preventDefault();
			//hmmm surely can do better
			$(".navs-wrapper").toggleClass("tablet_menu_active");
			hamburger.toggleClass("active");
		});

		// $("a").click(e => {
		// 	console.log("clicked", e.currentTarget);
		// });
		$(".reveal, #hamburger-icon ").click(e => {
			$(".reveal").removeClass("animate");
			$(".navs-wrapper").removeClass("menu-left");
			$(".see").removeClass("see");
		});
		$(".menu-item-has-children > a").click(e => {
			e.preventDefault();
			$(".reveal").addClass("animate");
			$(".navs-wrapper").addClass("menu-left");
			$(e.currentTarget)
				.parent()
				.find("ul")
				.addClass("see");
		});
	});

	/* Loader */
	$(window).on("load", function() {
		console.log("window loaded");

		setTimeout(function() {
			$(".loader").fadeOut("slow");
		}, 400);

		if ($(".gallery").length > 0) {
			gallery.init();
		}

		var $form = $("#mc-embedded-subscribe-form");
		if ($form.length > 0) {
			mailchimpForm.init($form);
		}
	});
})(undefined, jQuery);
