var geocoder = new google.maps.Geocoder();
// global var
var map = null;

var gmaps = {

	getLatLong: function(address, callback, map, $marker) {
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
		}, function(results, status) {
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

	new_map: function($el) {

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
		$markers.each(function() {

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

	add_marker: function(location, map, $marker) {

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
			google.maps.event.addListener(marker, "click", function() {

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

	center_map: function(map) {

		// vars
		var bounds = new google.maps.LatLngBounds();

		// console.log("map", map);
		// console.log("map.markers", map.markers);
		// console.log("map.markers.length", map.markers.length);
		// WHAT....... what is async in previous funcs?
		setTimeout(function() {
			// loop through all markers and create bounds
			$.each(map.markers, function(i, marker) {

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

	panToPosition: function(position) {
		console.log("map", map);
		map.panTo(position);
	},

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

$(".select_center").change(() => {
	// var map = new_map($(".acf-map"));
	getLatLong($(".select_center").val(), panToPosition);
// map.panTo
});

$(document).ready(function() {

	$(".acf-map").each(() => {

		// create map
		map = new_map($(this));
	// console.log("map created");
	});
});

module.exports = {
	gmaps
};