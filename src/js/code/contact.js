/* Cookie */

var contact = {
    aFunction: function(name, value) {}
};

(function(root, $, undefined) {
"use strict";

$(() => {

    var form_error_msg = "Some fields have issues, please check the fields above.";

    var tdny_required_msg = "This field is required!";
    var tdny_valid_email_msg = "This email is invalid!";


    //  ADD MAILCHIMP ? MAYBE NOT A FIRST AS WE DONT WANT TO ADD CHECKBOX SAYING WE'RE COLLECTING INFO

    function testEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    //could be better if we check for first time touched?
    function validateEmail(element) {
        if (!testEmail(element.val())) {
            element.parent().find('.error').text(tdny_valid_email_msg);
            return false;
        } else {
            element.parent().find('.error').text('');
            return true;
        }
    }

    //should adapt for particular form
    function isEmailFieldCorrect() {
        // console.log(validateEmail($('input[type=email]')));
        return validateEmail($('input[type=email]'));
    }

    function isEmptyString(string) {
        return string == '' || string == null;
    }

    function validateRequiredField(element) {
        if (isEmptyString(element.val())) {
            element.parent().find('.error').text(tdny_required_msg);
            if (element.hasClass('not_empty')) {
                element.removeClass('not_empty')
            }
            return false;
        } else {
            element.parent().find('.error').text('');
            element.addClass('not_empty');
            return true;
        }
    }

    function areRequiredFieldsValid() {
        var required_fields = $('input[required=required],textarea[required=required]');
        var valid = true;
        Array.prototype.forEach.call(required_fields, element => {
            if (!validateRequiredField($(element))) {
                valid = false;
            }
        });

        // console.log('valid', valid);

        return valid;
    }

    //we're assuming there is only one form... we could adapt to find elements in given form
    function isFormValid() {

        // console.log('areRequiredFieldsValid()', areRequiredFieldsValid());
        // console.log('isEmailFieldCorrect();', isEmailFieldCorrect()); 

        return areRequiredFieldsValid() && isEmailFieldCorrect();
    }


    $("input, textarea").keyup(e => {
        // console.log('change', $(e.currentTarget));

        var current_element = $(e.currentTarget);

        //Is this field required and does it have text
        if (current_element.prop('required')) {
            validateRequiredField(current_element)
        }

        if (current_element.attr('type') == 'email') {
            validateEmail(current_element)
        }
    });

    $('.tdny_submit_contact_form').click(function() {
        //  ADD BACK WHEN TESTING DONE

        if (!isFormValid()) {
            $('.contact-msg').html(form_error_msg);
            $('.contact-msg').addClass('error')

            return false;
        } else {
            if ($('.contact-msg').hasClass('error')) {
                $('.contact-msg').removeClass('error')
            }
            // $('.contact-msg').html('<img src="https://mailgun.github.io/validator-demo/loading.gif" alt="Loading...">');
            $('.contact_form_button').addClass('trying');


            $.ajax({
                type: "GET",
                url: 'https://apilayer.net/api/check',
                data: {
                    access_key: 'c673ff585d5fa454aa388487d9b7ef7c',
                    // email: email,
                    //shoud get current form email var, TODO
                    email: $('input[type=email]').val(),
                    smtp: 1,
                    format: 0
                },
                dataType: "json",
                crossDomain: true,
                success: function(data, status_text) {
                    // setTimeout(func, delay)
                    $('.contact_form_button').removeClass('trying');
                    //maybe add txt for disposable
                    if (data['format_valid'] && !data['disposable']) {
                        if (data['did_you_mean']) {
                            $('.contact-msg').addClass('error');
                            $('.contact-msg').html('Error, did you mean <em>' + data['did_you_mean'] + '</em>?');
                            return false;
                        } else if (!data['mx_found']) {
                            $('.contact-msg').addClass('error');
                            $('.contact-msg').html('The entered mail address is invalid.');
                            return false;
                        } else {
                            $.ajax({
                                type: 'POST',
                                url: ajax_object.ajax_url,
                                data: $('.contact_form').serialize(),
                                dataType: 'json',
                                success: function(response) {
                                    if (response.status == 'success') {
                                        //and disable button after sent

                                        $('.contact_form_button').addClass('sent_ok');
                                        $('.contact_form')[0].reset();
                                    }
                                    $('.contact-msg').html(response.errmessage);
                                }
                            });
                        }

                    } else {
                        $('.contact-msg').html('The entered mail address is invalid.');
                        return false;
                    }
                },
                error: function(request, status_text, error) {
                    $('.contact_form_button').removeClass('trying');
                    $('.contact-msg').html('Error occurred, unable to validate your email address.');
                    return false;
                }
            });
        }
    });

});
})(undefined, jQuery);

module.exports = {
    contact
};