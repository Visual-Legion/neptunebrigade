(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/* Sliders */

var gallery = {
	loadGallerySlider: function loadGallerySlider(sliderID) {
		// Removing active class and deslickifying all sliders to save processing, + removeing class from button and index marker
		jQuery(".vl-gallery__sliders__slider").removeClass("active");
		jQuery(".vl-gallery__sliders__slider").prev().removeClass("active");
		jQuery.each(jQuery(".vl-gallery__sliders__slider"), function (index, slider) {
			if (jQuery(slider).hasClass("slick-initialized")) {
				jQuery(slider).slick("unslick");
			}
		});
		jQuery(".button--tab").removeClass("active");

		// adding class to current slider + slickifying it
		jQuery(sliderID).addClass("active");
		jQuery(".button--tab[href=" + sliderID + "]").addClass("active");
		jQuery(sliderID).prev().addClass("active");

		jQuery(sliderID)
		// .eq(index)
		.slick({
			// autoplay: true,
			// autoplaySpeed: 5000,
			// padding: 20,
			swipeToSlide: true,
			arrows: false,
			dots: false,
			slidesToShow: 1,
			centerMode: true,
			variableWidth: true,
			infinite: false,
			responsive: [{
				breakpoint: 600,
				settings: {
					centerPadding: "0px"
				}
			}]
		}).slick("slickGoTo", 0);
		jQuery(sliderID)
		// .eq(index)
		.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
			var curSlideReal = nextSlide < 10 ? "0" + (nextSlide + 1) : nextSlide + 1;

			jQuery(sliderID)
			// .eq(index)
			.prev().find(".slide-index").text(curSlideReal);

			var slidesLength = slick.$slides.length - 1,
			    isCurrentFirstOrLast = currentSlide === 0 || currentSlide === slidesLength,
			    isNextFirstOrLast = nextSlide === 0 || nextSlide === slidesLength;

			// console.log("slidesLength", slidesLength);
			// console.log("currentSlide", currentSlide);
			// console.log("nextSlide", nextSlide);
			// console.log();

			if (isCurrentFirstOrLast && isNextFirstOrLast) {
				// console.log("yes");

				var nextClone = jQuery(event.currentTarget).find(".slick-cloned.slick-active");
				setTimeout(function () {
					nextClone.addClass("slick-current");
				}, 100);
			}
		});
		jQuery(".button--tab").unbind().click(function (e) {
			// console.log(e);
			// targeting slider with specific ID
			gallery.loadGallerySlider(e.target.hash);
		});
		// }
	},
	init: function init() {
		if (window.location.hash != "" && window.location.hash != undefined) {
			gallery.loadGallerySlider(window.location.hash);
		} else {
			gallery.loadGallerySlider("#slider-1");
		}
	}
};

module.exports = {
	gallery: gallery
};

},{}],2:[function(require,module,exports){
"use strict";

/* MailchimpForm */

var mailchimpForm = {
	register: function register(form) {
		var url = form.attr("action");
		url = url.replace("/post?u=", "/post-json?u=");
		url += "&c=?";

		jQuery("#mc-embedded-subscribe").val("Sending...");
		jQuery.ajax({
			type: form.attr("method"),
			url: url,
			data: form.serialize(),
			cache: false,
			dataType: "jsonp",
			contentType: "application/json; charset=utf-8",
			error: function error(err) {
				alert("Could not connect to the registration server. Please try again later.");
			},
			success: function success(data) {
				jQuery("#mc-embedded-subscribe").val("Submit");

				if (data.result === "success") {
					// Yeahhhh Success
					console.log(data.msg);
					console.log(data);
					jQuery("#mce-EMAIL").removeClass("mce_inline_error");

					//could be better but maybe we'll only have oneliners in future?
					if (jQuery(".page-template-contact").length > 0) {
						jQuery("#mce-NAME").removeClass("mce_inline_error");
					}

					jQuery("#subscribe-result p").html("Thank you for subscribing. We have sent you a confirmation email.");
					jQuery("#subscribe-result ").removeClass("error");
					jQuery("#subscribe-result ").addClass("success");

					//Make DRY
					jQuery("#mce-EMAIL").val("");
					jQuery("#mce-NAME").val("");
				} else {
					// Something went wrong, do something to notify the user.
					// console.log(data.msg);
					// console.log(data);

					// CHECK IF HAS REQUIRED AND EMPTY
					jQuery("#mce-EMAIL").addClass("mce_inline_error");

					//could be better but maybe we'll only have oneliners in future?
					if (jQuery(".page-template-contact").length > 0) {
						jQuery("#mce-NAME").addClass("mce_inline_error");
					}
					jQuery("#subscribe-result ").removeClass("success");
					jQuery("#subscribe-result ").addClass("error");
					jQuery("#subscribe-result p").html(data.msg.substring(4));
				}
			}
		});
	},
	init: function init(form) {
		// var form = jQuery("#mc-embedded-subscribe-form");
		// if (form.length > 0) {
		jQuery('form input[type="submit"]').bind("click", function (event) {
			if (jQuery("#mc-embedded-subscribe-form input[type='checkbox']").length > 0) {
				if (jQuery("#mc-embedded-subscribe-form input[type='checkbox']:checked").length > 0) {
					console.log("chekced");
					if (event) event.preventDefault();
					mailchimpForm.register(form);
				} else {
					jQuery("#subscribe-result").css("color", errorColor);
					jQuery("#subscribe-result p").html("Please accept the Terms of Use and Privacy Policy First by click on the checkbox");
				}
			} else {
				console.log("chekced");
				if (event) event.preventDefault();
				mailchimpForm.register(form);
			}
		});
	}
	// }
};

module.exports = {
	mailchimpForm: mailchimpForm
};

},{}],3:[function(require,module,exports){
"use strict";

// if

var _require = require("./gallery"),
    gallery = _require.gallery;
// const { tabSection } = require("./tabSection");


var _require2 = require("./mailchiumpForm"),
    mailchimpForm = _require2.mailchimpForm;

var _require3 = require("./scroll"),
    scroll = _require3.scroll;

(function (root, $, undefined) {
	"use strict";

	$(function () {
		// DOM ready, take it away
		console.log("DOM Ready V0.2 ");

		/**
   * Mobile menu
   */

		var hamburger = $("#hamburger-icon");
		hamburger.click(function (e) {
			e.preventDefault();
			//hmmm surely can do better
			$(".navs-wrapper").toggleClass("tablet_menu_active");
			hamburger.toggleClass("active");
		});

		// $("a").click(e => {
		// 	console.log("clicked", e.currentTarget);
		// });
		$(".reveal, #hamburger-icon ").click(function (e) {
			$(".reveal").removeClass("animate");
			$(".navs-wrapper").removeClass("menu-left");
			$(".see").removeClass("see");
		});
		$(".menu-item-has-children > a").click(function (e) {
			e.preventDefault();
			$(".reveal").addClass("animate");
			$(".navs-wrapper").addClass("menu-left");
			$(e.currentTarget).parent().find("ul").addClass("see");
		});
	});

	/* Loader */
	$(window).on("load", function () {
		console.log("window loaded");

		setTimeout(function () {
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

},{"./gallery":1,"./mailchiumpForm":2,"./scroll":4}],4:[function(require,module,exports){
"use strict";

document.addEventListener("DOMContentLoaded", function () {
	var e = function () {
		if ("scrollingElement" in document) return document.scrollingElement;
		var a = document.documentElement,
		    b = a.scrollTop;
		a.scrollTop = b + 1;
		var c = a.scrollTop;
		a.scrollTop = b;
		return c > b ? a : document.body;
	}(),
	    h = function h(a) {
		var b = e.scrollTop;
		if (2 > a.length) a = -b;else if (a = document.querySelector(a)) {
			a = a.getBoundingClientRect().top;
			var c = e.scrollHeight - window.innerHeight;
			a = b + a < c ? a : c - b;
		} else a = void 0;
		if (a) return new Map([["start", b], ["delta", a]]);
	},
	    m = function m(a) {
		var b = a.getAttribute("href"),
		    c = h(b);
		if (c) {
			var d = new Map([["duration", 800]]),
			    k = performance.now();
			requestAnimationFrame(function l(a) {
				d.set("elapsed", a - k);
				a = d.get("duration");
				var f = d.get("elapsed"),
				    g = c.get("start"),
				    h = c.get("delta");
				e.scrollTop = Math.round(h * (-Math.pow(2, -10 * f / a) + 1) + g);
				d.get("elapsed") < d.get("duration") ? requestAnimationFrame(l) : (history.pushState(null, null, b), e.scrollTop = c.get("start") + c.get("delta"));
			});
		}
	},
	    n = function b(c, d) {
		var e = c.item(d);
		e.addEventListener("click", function (b) {
			b.preventDefault();
			m(e);
		});
		if (d) return b(c, d - 1);
	},
	    f = document.querySelectorAll("a.scroll"),
	    g = f.length - 1;
	0 > g || n(f, g);
});

},{}]},{},[3])

//# sourceMappingURL=scripts.js.map
