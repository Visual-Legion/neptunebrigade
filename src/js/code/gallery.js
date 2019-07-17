/* Sliders */

const gallery = {
	loadGallerySlider: sliderID => {
		// Removing active class and deslickifying all sliders to save processing, + removeing class from button and index marker
		jQuery(".vl-gallery__sliders__slider").removeClass("active");
		jQuery(".vl-gallery__sliders__slider")
			.prev()
			.removeClass("active");
		jQuery.each(jQuery(".vl-gallery__sliders__slider"), (index, slider) => {
			if (jQuery(slider).hasClass("slick-initialized")) {
				jQuery(slider).slick("unslick");
			}
		});
		jQuery(".button--tab").removeClass("active");

		// adding class to current slider + slickifying it
		jQuery(sliderID).addClass("active");
		jQuery(".button--tab[href=" + sliderID + "]").addClass("active");
		jQuery(sliderID)
			.prev()
			.addClass("active");

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
				responsive: [
					{
						breakpoint: 600,
						settings: {
							centerPadding: "0px"
						}
					}
				]
			})
			.slick("slickGoTo", 0);
		jQuery(sliderID)
			// .eq(index)
			.on("beforeChange", function(
				event,
				slick,
				currentSlide,
				nextSlide
			) {
				var curSlideReal =
					nextSlide < 10 ? "0" + (nextSlide + 1) : nextSlide + 1;

				jQuery(sliderID)
					// .eq(index)
					.prev()
					.find(".slide-index")
					.text(curSlideReal);

				let slidesLength = slick.$slides.length - 1,
					isCurrentFirstOrLast =
						currentSlide === 0 || currentSlide === slidesLength,
					isNextFirstOrLast =
						nextSlide === 0 || nextSlide === slidesLength;

				// console.log("slidesLength", slidesLength);
				// console.log("currentSlide", currentSlide);
				// console.log("nextSlide", nextSlide);
				// console.log();

				if (isCurrentFirstOrLast && isNextFirstOrLast) {
					// console.log("yes");

					let nextClone = jQuery(event.currentTarget).find(
						".slick-cloned.slick-active"
					);
					setTimeout(function() {
						nextClone.addClass("slick-current");
					}, 100);
				}
			});
		jQuery(".button--tab")
			.unbind()
			.click(e => {
				// console.log(e);
				// targeting slider with specific ID
				gallery.loadGallerySlider(e.target.hash);
			});
		// }
	},
	init: () => {
		if (window.location.hash != "" && window.location.hash != undefined) {
			gallery.loadGallerySlider(window.location.hash);
		} else {
			gallery.loadGallerySlider("#slider-1");
		}
	}
};

module.exports = {
	gallery
};
