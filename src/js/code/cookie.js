/* Cookie */

var cookie = {
    createCookie: function(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
        console.log('creaded cookie');
    },
    readCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
};

(function(root, $, undefined) {
"use strict";

$(() => {

    $('.cookie_wrapper a').click(() => {
        cookie.createCookie('acceptedCookie', 'yes', 30);
        $('.cookie_wrapper').toggleClass('hidden');
    });

    var acceptedCookie = cookie.readCookie('acceptedCookie');

    console.log('acceptedCookie', acceptedCookie);

    if (acceptedCookie === 'yes') {
        $('.cookie_wrapper').addClass('hidden');
    }

});
})(undefined, jQuery);

module.exports = {
    cookie
};