(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/* Cookie */

var cookie = {
    createCookie: function createCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
        console.log('creaded cookie');
    },
    readCookie: function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
};

$('.cookie_wrapper a').click(function () {
    createCookie('blonde-age-legal', 'yes', 30);
    $('.cookie_wrapper').toggleClass('hidden');
});

var acceptedCookie = readCookie('blonde-age-legal');

console.log('acceptedCookie', acceptedCookie);

if (acceptedCookie === 'yes') {
    $('.cookie_wrapper').addClass('hidden');
}

module.exports = {
    cookie: cookie
};

},{}],2:[function(require,module,exports){
"use strict";

var geocoder = new google.maps.Geocoder();
// global var
var map = null;

var gmaps = {

	getLatLong: function getLatLong(address, callback, map, $marker) {
		// var address_string;
		// console.log("tyepof $address", typeof $address);
		// if (typeof address == "object") {
		// 	console.log("$address", $address);
		// 	address_string = ($address.attr("data-address"));

		// } else {
		// 	address_string = $address;
		// }

		geocoder.geocode({
			"address": address
		}, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				// console.log("gettin lat long of " + address, results[0].geometry.location);
				// console.log("lat :", results[0].geometry.location.lat());
				// console.log("lng :", results[0].geometry.location.lng());


				if (typeof callback === "function") {
					callback(results[0].geometry.location, map, $marker);
				} else {

					return results[0].geometry.location;
				}
			} else {
				// console.log("callback", callback);
				// console.log("address", address);
				// console.log("map", map);
				console.log("Le geocodage n\"a pu etre effectue pour la raison suivante: " + status);
			}
		});
	},

	new_map: function new_map($el) {

		// var
		var $markers = $el.find(".marker");

		// vars
		var args = {
			zoom: 12,
			center: new google.maps.LatLng(0, 0),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		// create map	        	
		var map = new google.maps.Map($el[0], args);

		// add a markers reference
		map.markers = [];

		// add markers
		$markers.each(function () {

			// add_marker($(this), map);
			// console.log("this", $(this)[0]);
			// console.log("data-address", $(this).attr("data-address"));
			getLatLong($(this).attr("data-address"), add_marker, map, $(this));
		});

		// console.log("map.markers", map.markers);

		// center map
		center_map(map);

		// return
		return map;
	},

	/*
       *  add_marker
       *
       *  This function will add a marker to the selected Google Map
       *
       *  @type	function
       *  @date	8/11/2013
       *  @since	4.3.0
       *
       *  @param	$marker (jQuery element)
       *  @param	map (Google Map object)
       *  @return	n/a
       */

	//ACF DEFAULT
	// function add_marker(location, $marker, map) {

	// 	// var
	// 	// var latlng = new google.maps.LatLng($marker.attr("data-lat"), $marker.attr("data-lng"));
	// 	var latlng = new google.maps.LatLng(0, 0);

	// 	// create marker
	// 	var marker = new google.maps.Marker({
	// 		position: latlng,
	// 		map: map
	// 	});

	// 	// add to array
	// 	map.markers.push(marker);

	// 	// if marker contains HTML, add it to an infoWindow
	// 	if ($marker.html()) {
	// 		// create info window
	// 		var infowindow = new google.maps.InfoWindow({
	// 			content: $marker.html()
	// 		});

	// 		// show info window when marker is clicked
	// 		google.maps.event.addListener(marker, "click", function() {

	// 			infowindow.open(map, marker);

	// 		});
	// 	}

	// }

	add_marker: function add_marker(location, map, $marker) {

		// console.log("lat : location.lat() :", location.lat());
		// console.log("lng : location.lng() :", location.lng());
		// console.log("map", map);

		var icon = {
			path: "M18.138 3.167c-4.048-4.05-10.613-4.05-14.662 0-3.648 3.65-4.059 10.524-.963 14.654l8.294 11.985 8.294-11.985c3.096-4.13 2.685-11.004-.963-14.654zm-7.23 10.659a3.423 3.423 0 0 1-3.422-3.424 3.423 3.423 0 1 1 6.844 0 3.423 3.423 0 0 1-3.422 3.424z",
			fillColor: "#FE9426",
			fillOpacity: 1,
			anchor: new google.maps.Point(0, 0),
			strokeWeight: 0,
			scale: 1
		};

		// var
		var latlng = new google.maps.LatLng(location.lat(), location.lng());

		// create marker
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			icon: icon
		});

		// add to array
		map.markers.push(marker);

		// console.log("map.markers", map.markers);

		// console.log("marker html", $marker.html());
		// if marker contains HTML, add it to an infoWindow
		if ($marker.html()) {
			// create info window
			var infowindow = new google.maps.InfoWindow({
				content: $marker.html()
			});

			// show info window when marker is clicked
			google.maps.event.addListener(marker, "click", function () {

				infowindow.open(map, marker);
			});
		}
	},

	/*
       *  center_map
       *
       *  This function will center the map, showing all markers attached to this map
       *
       *  @type	function
       *  @date	8/11/2013
       *  @since	4.3.0
       *
       *  @param	map (Google Map object)
       *  @return	n/a
       */

	center_map: function center_map(map) {

		// vars
		var bounds = new google.maps.LatLngBounds();

		// console.log("map", map);
		// console.log("map.markers", map.markers);
		// console.log("map.markers.length", map.markers.length);
		// WHAT....... what is async in previous funcs?
		setTimeout(function () {
			// loop through all markers and create bounds
			$.each(map.markers, function (i, marker) {

				var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

				console.log("latlng of markers", latlng);

				bounds.extend(latlng);
			});

			// only 1 marker?
			if (map.markers.length === 1) {
				// set center of map
				map.setCenter(bounds.getCenter());
				map.setZoom(16);
			} else {
				// fit to bounds
				map.fitBounds(bounds);
			}
		}, 1000);
	},

	panToPosition: function panToPosition(position) {
		console.log("map", map);
		map.panTo(position);
	}

	// function recenter_on_select() {
	// 	console.log();
	// }

	/*
       *  document ready
       *
       *  This function will render each map when the document is ready (page has loaded)
       *
       *  @type	function
       *  @date	8/11/2013
       *  @since	5.0.0
       *
       *  @param	n/a
       *  @return	n/a
       */
};

$(".select_center").change(function () {
	// var map = new_map($(".acf-map"));
	getLatLong($(".select_center").val(), panToPosition);
	// map.panTo
});

$(document).ready(function () {
	var _this = this;

	$(".acf-map").each(function () {

		// create map
		map = new_map($(_this));
		console.log("map created");
	});
});

module.exports = {
	gmaps: gmaps
};

},{}],3:[function(require,module,exports){
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

},{"./cookie":1,"./maps":2}]},{},[3])

//# sourceMappingURL=../build/src/js/code/scripts.js.map
