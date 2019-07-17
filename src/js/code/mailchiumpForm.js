/* MailchimpForm */

const mailchimpForm = {
	register: form => {
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
			error: function(err) {
				alert(
					"Could not connect to the registration server. Please try again later."
				);
			},
			success: data => {
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

					jQuery("#subscribe-result p").html(
						"Thank you for subscribing. We have sent you a confirmation email."
					);
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
	init: form => {
		// var form = jQuery("#mc-embedded-subscribe-form");
		// if (form.length > 0) {
		jQuery('form input[type="submit"]').bind("click", function(event) {
			if (
				jQuery("#mc-embedded-subscribe-form input[type='checkbox']")
					.length > 0
			) {
				if (
					jQuery(
						"#mc-embedded-subscribe-form input[type='checkbox']:checked"
					).length > 0
				) {
					console.log("chekced");
					if (event) event.preventDefault();
					mailchimpForm.register(form);
				} else {
					jQuery("#subscribe-result").css("color", errorColor);
					jQuery("#subscribe-result p").html(
						"Please accept the Terms of Use and Privacy Policy First by click on the checkbox"
					);
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
	mailchimpForm
};
