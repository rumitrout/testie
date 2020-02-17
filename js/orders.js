// Knockout Models

var ko_orders;

var Orders = function() {
    // Model Init
    var self = this;
    self.orders = ko.observableArray([]);

};

function setup_ko_orders() {
    if(!($('#ko-orders-block').length)) {
        return;
    }
    ko_orders = new Orders();
    ko.applyBindings(ko_orders, document.getElementById('ko-orders-block'));
}

function setup_auth() {
    if(!is_logged_in()) {
        goto_member_link(window.location.pathname);
    }
}

function fetch_orders() {
    var url = '/api/orders';
    var data = {};
    data.token = localStorage.u_token;
    if(localStorage.last_payment_cancelled === "yes") {
        data.cancel_payment = localStorage.last_payment_id;
        delete(localStorage.last_payment_id);
        delete(localStorage.last_payment_cancelled);
    }
    $.getJSON(url, data)
    .done(function(response) {
        if(response && response.status && response.status == 'success' && response.orders) {
            ko_orders.orders.removeAll();
            var i;
            for(i in response.orders) {
                ko_orders.orders.push(response.orders[i]);
            }
            return;
        }
        $('#status_text').html('Error fetching orders!');
    })
    .fail(function(err) {
        $('#status_text').html('Error fetching orders!');
    });
}


$(function() {

    setup_auth();
    setup_ko_orders();
    fetch_orders();
    wire_order();

});


