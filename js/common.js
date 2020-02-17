/* Major Version Cleanups */
// Switch to Version 3
if(!localStorage.client_version || localStorage.client_version < 3) {
    delete(localStorage.cart);
    delete(localStorage.profile);
    delete(localStorage.u_name);
    delete(localStorage.u_token);
    localStorage.client_version = 3;
}

/* Generic Functions */

function format_datetime(unix_timestamp) {
    var date = new Date(unix_timestamp*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();
    var formattedDate =  year + '-' + month.substr(-2) + '-' + day.substr(-2);

    return formattedDate + ' ' + formattedTime;

}

/* Common UI Changes/Events */

function lazy_load() {
    var fontName = 'Oxygen:400,700';

    $("head").append("<link href='https://fonts.googleapis.com/css?family=" + fontName + "' rel='stylesheet' type='text/css'>");
    $("head").append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">');

    if(history.length > 0) {
        $('.hist_back_button')
            .show()
            .click(function() {
                history.back();
            });
    }
}

function setup_cart_button() {
    if("cart" in localStorage) {
        try {
            var cart = JSON.parse(localStorage.cart);
        }
        catch(e) {}
        if(cart && cart.items) {
            $('.cart-menu-item').show();
        }
    }
    $('.cart-menu-item button').click(function() {
        window.location = '/cart';
    })
}

$(function() {
    setTimeout(lazy_load, 5);
    setup_cart_button();
});


