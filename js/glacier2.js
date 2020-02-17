
function rfqs_helper() {
    var url = '/g2/rfqs_helper';
    var data = { rfq_ids: rfq_ids };
    $.post(url, data)
    .done(function(response) {
        if(response && response.status) {
            if(response.status == 'success' && response.rfqs) {
                for(i in response.rfqs) {
                    rfq = response.rfqs[i];
                    tx_block = $('.tx-block[data-tx-id="' + rfq['id'] + '"]');
                    tx_row = $(tx_block).find('.tx-row');

                    // rfq Date
                    $(tx_block).find('.label-date').html(rfq['label_date']);
                    if(rfq['label_date']) {
                        tx_row.addClass('date-row');
                    }

                    if(rfq["segment_class"] != undefined) {
                        tx_block.find('.segment').addClass('segment' + rfq["segment_class"]);
                        tx_block.find('.circle').attr("title", rfq["label_status"]);
                        if(rfq["segment_class"] == 'gray'){
                             tx_row.removeClass('date-row');
                             tx_row.addClass('gray-row');
                        }
                        else if(rfq["segment_class"] == 'orange'){
                             tx_row.removeClass('date-row');
                             tx_row.addClass('orange-row');
                        }
                    }

                    // Client Website
                    if(rfq["client_website"]) {
                        if(rfq["client_website"].indexOf('://') == -1) {
                            rfq["client_website"] = 'http://' + rfq["client_website"];
                        }
                        $(tx_block).find('.actions-client').append(
                            '<a href="' + rfq["client_website"] + '"' +
                                ' target = "_blank">' +
                                '<i class="fa fa-globe"></i>' +
                            '</a>'
                        );                
                    }

                    // Type Label
                    if(rfq['label_type'] == 'NIL' || rfq['label_type'] == 'UNK') {
                        type_html = '<a class="plain-link" ' + 
                            'href="' + rfq['change_type_url'] + '" ' +
                            'data-title="' + rfq['client_name'] + '" ' +
                            'data-remote="false" data-toggle="modal" data-target="#popup_modal">' +
                            rfq['label_type'] + '</a>';
                    }
                    else {
                        type_html = rfq['label_type'];
                    }
                    
                    $(tx_block).find('.label-type')
                        .html(type_html)
                        .attr('title', "Client Type: " + rfq['client_type'])
                        .addClass("label-" + rfq['label_type']);
                    
                    // Country Icon
                    $(tx_block).find('.flag-icon').attr('title', "Billing: " + rfq['country_name']);

                    // Actions
                    if(rfq['actions']) {
                        for(j in rfq['actions']) {
                            action = rfq['actions'][j];
                            item_index = action['item_index'];
                            modal_classes = "";
                            $actions = $(tx_block).find('.actions-' + item_index);
                            if(action["data-title"]) {
                                modal_classes = 'data-title="' + action["data-title"] + '"' + 'data-url="' + action["data-url"] + '"';
                                $actions.append('<span> ' + 
                                    '<a href="#" class="iframe-dialog"' + modal_classes + '>' +
                                    action["text"] +
                                    '</a>' +
                                    ' </span>'
                                );
                            }
                            if(action["modal_title"]) {
                                modal_classes = 'data-title="' + action["modal_title"] + '" data-remote="false" data-toggle="modal" data-target="#popup_modal"';
                                $actions.append('<span> ' + 
                                    '<a ' + modal_classes + 'href="' + action["url"] + '">' +
                                    action["text"] +
                                    '</a>' +
                                    ' </span>'
                                );
                            }
                            
                            
                        }
                    }
                    if(rfq['quote']) {
                       
                        
                        $quote = $(tx_block).find('.actions-quote');
                    
                        $quote.append('<span><a href= '+ rfq['quote_url'] +" "+ 'data-title= "Preview Quote"' + '" data-remote="false" data-toggle="modal" data-target="#popup_modal">CQ: ' +rfq['quote']['tx_number'] +
                            '</a></span><span class="page-container"></span><span><a href=/g2/tx_edit/Quote/'+rfq['quote_id']+" " + "data-title='Edit Quote'"+ "data-remote='false'"+ "data-toggle='modal'"+"data-target='#popup_modal'>" + 'Edit'+
                                '</a></span><span class="page-container"></span>'+'<span><a href= '+ rfq['lost_url'] +" "+ 'data-title= "Mark Lost"' + '" data-remote="false" data-toggle="modal" data-target="#popup_modal">Mark Lost'+
                            '</a></span><span class="page-container"></span><span><a href=/g2/tx_send/Quote/'+rfq['quote_id']+" " + "data-title='Send Quote'"+ "data-remote='false'"+ "data-toggle='modal'"+"data-target='#popup_modal'>" + 'Resend'+
                                '</a>'
                        );
                       
                    }
                    if(rfq['transactions']) {
                        for(j in rfq['transactions']) {
                            transaction = rfq['transactions'][j];
                            modal_classes = '"data-title="Prepare Quote"' + '" data-remote="false" data-toggle="modal" data-target="#popup_modal"';
                            $transactions = $(tx_block).find('.actions-transactions');
                            $url = "/g2/quote/prepare/"+rfq['id']+"/"+transaction['id'];
                           
                            $transactions.append('<span><a href=/g2/vq/view/'+transaction['id']+"/true " + '"data-title="Vendor Quote"' + '" data-remote="false" data-toggle="modal" data-target="#popup_modal">VQ: ' + transaction['supplier']['name'] +
                                '</a></span><span class="page-container"></span><span><a href=/g2/tx_edit/VendorQuote/'+transaction['id']+" " + "data-title='Edit VendorQuote'"+ "data-remote='false'"+ "data-toggle='modal'"+"data-target='#popup_modal'>" + 'Edit'+
                                '</a></span><span class="page-container"></span>'+ transaction['currency_code']+" "+transaction['items'][0]['rate']+'<span class="page-container"><a ' + modal_classes + 'href="' + $url + '">CQ</a>' + '</span><br>'
                            );
                        }
                    }
                }
            }
        }
        on_helper_load('rfq');
    });
}

function orders_helper() {
    var url = '/g2/orders_helper';
    var data = { order_ids: order_ids };
    $.post(url, data)
    .done(function(response) {
        if(response && response.status) {
            if(response.status == 'success' && response.orders) {
                for(i in response.orders) {
                    order = response.orders[i];
                    order_block = $('.tx-block[data-order-id="' + order['id'] + '"]');
                    order_row = $(order_block).find('.tx-row');

                    // Order Date
                    $(order_block).find('.label-date').html(order['label_date']);
                    if(order['label_date']) {
                        order_row.addClass('date-row');
                    }
                    if(order["segment_class"] != undefined) {
                        order_block.find('.segment').addClass('segment' + order["segment_class"]);
                        order_block.find('.circle').attr("title", order["label_status"]);
                        order_block.find('.status').text(order['label_status']);
                        if(order["segment_class"] == 'gray'){
                             order_row.removeClass('date-row');
                             order_row.addClass('gray-row');
                        }
                    }
                    if(order["profit"]) {
                        $(order_block).find('.profit-value').html('$'+order['profit']['value']);
                        $(order_block).find('.profit-per').html(order['profit']['percentage'] + '%');
                    
                    }
                    // Client Website
                    if(order["client_website"]) {
                        if(order["client_website"].indexOf('://') == -1) {
                            order["client_website"] = 'http://' + order["client_website"];
                        }
                        $(order_block).find('.actions-client').append(
                            '<a href="' + order["client_website"] + '"' +
                                ' target = "_blank">' +
                                '<i class="fa fa-globe"></i>' +
                            '</a>'
                        );                
                    }

                    // Type Label
                    if(order['label_type'] == 'UNK') {
                        type_html = '<a class="plain-link" ' + 
                            'href="' + order['change_type_url'] + '" ' +
                            'data-title="' + order['client_name'] + '" ' +
                            'data-remote="false" data-toggle="modal" data-target="#popup_modal">' +
                            'UNK' + '</a>';
                    }
                    else {
                        type_html = order['label_type'];
                    }
                    $(order_block).find('.label-type')
                        .html(type_html)
                        .attr('title', "Client Type: " + order['client_type'])
                        .addClass("label-" + order['label_type']);
                    
                    // Country Icon
                    $(order_block).find('.flag-icon').attr('title', "Billing: " + order['country_name']);

                    // Actions
                    if(order['actions']) {
                        for(j in order['actions']) {
                            action = order['actions'][j];
                            item_index = action['item_index'];
                            modal_classes = "";
                            $actions = $(order_block).find('.actions-' + item_index);
                            if(action["data-title"]) {
                                modal_classes = 'data-title="' + action["data-title"] + '"' + 'data-url="' + action["data-url"] + '"';
                                $actions.append('<span> ' + 
                                    '<a href="#" class="iframe-dialog"' + modal_classes + '>' +
                                    action["text"] +
                                    '</a>' +
                                    ' </span>'
                                );
                            }
                            if(action["modal_title"]) {
                                modal_classes = 'data-title="' + action["modal_title"] + '" data-remote="false" data-toggle="modal" data-target="#popup_modal"';
                                $actions.append('<span> ' + 
                                    '<a ' + modal_classes + 'href="' + action["url"] + '">' +
                                    action["text"] +
                                    '</a>' +
                                    ' </span>'
                                );
                            }
                        }
                    }
                    if(order['codes']){

                        for(k in order['codes']){
                            code = order['codes'][k];
                            $actions = $(order_block).find('.actions-' + code['index']);
                            modal_classes = 'data-title="' + "Add HS/ECCN Code" + '" data-remote="false" data-toggle="modal" data-target="#popup_modal"';
                            $actions.append('<br> HS <span>' + 
                                    '<a ' + modal_classes + 'href="' + code["url"] + '">' +
                                    code["hs_code"] +
                                    '</a>' +
                                    '</span> ECCN# <span>'+ 
                                    '<a ' + modal_classes + 'href="' + code["url"] + '">' +
                                    code["eccn_code"] +
                                    '</a>' +
                                    '</span>' 
                            );
                        }
                        
                    }
                }
            }
        }
        on_helper_load('order');
    });
    
}
function vpos_helper() {
    var url = '/g2/vpos_helper';
    var data = { vpo_ids: vpo_ids };
    $.post(url, data)
    .done(function(response) {
        if(response && response.status) {
            if(response.status == 'success' && response.vpos) {
                
                for(i in response.vpos) {
                    order = response.vpos[i];
                    order_block = $('.tx-block[data-order-id="' + order['id'] + '"]');
                    order_row = $(order_block).find('.tx-row');

                    // Order Date
                    $(order_block).find('.label-date').html(order['label_date']);
                    if(order['label_date']) {
                        order_row.addClass('date-row');
                    }

                    if(order["segment_class"] != undefined) {
                        order_block.find('.segment').addClass('segment' + order["segment_class"]);
                        order_block.find('.circle').attr("title", order["label_status"]);
                        if(order["segment_class"] == 'gray'){
                             order_row.removeClass('date-row');
                             order_row.addClass('gray-row');
                        }
                    }

                    // Type Label
                    
                    type_html = order['label_type'];
                    
                    /*$(order_block).find('.label-type')
                        .html(type_html)
                        .attr('title', "Distributor Type: " + order['supplier_type'])
                        .addClass("label-" + order['label_type']);
                    */
                    // Actions
                    if(order['actions']) {
                        for(j in order['actions']) {
                            action = order['actions'][j];
                            item_index = action['item_index'];
                            modal_classes = "";
                            if(action["modal_title"]) {
                                modal_classes = 'data-title="' + action["modal_title"] + '" data-remote="false" data-toggle="modal" data-target="#popup_modal"';
                            }
                            $actions = $(order_block).find('.actions-' + item_index);
                            $actions.append('<span>' + 
                                '<a ' + modal_classes + 'href="' + action["url"] + '">' +
                                action["text"] +
                                '</a>' +
                                '</span>'
                            );
                        }
                    }
                    if(order['codes']){

                        for(k in order['codes']){
                            code = order['codes'][k];
                            $actions = $(order_block).find('.actions-' + code['index']);
                             modal_classes = 'data-title="' + "Add HS/ECCN Code" + '" data-remote="false" data-toggle="modal" data-target="#popup_modal"';
                            $actions.append('HS <span>' + 
                                    '<a ' + modal_classes + 'href="' + code["url"] + '">' +
                                    code["hs_code"] +
                                    '</a>' +
                                    '</span> ECCN# <span>'+ 
                                    '<a ' + modal_classes + 'href="' + code["url"] + '">' +
                                    code["eccn_code"] +
                                    '</a>' +
                                    '</span>' 
                            );
                        }
                        
                    }
                }
            }
        }
    });
}

function on_helper_load(resource) {
    iframe_dialog();
}


function show_spinner() {
    $("#popup_modal .spinner-overlay").show();
}

function hide_spinner(response, status, xhr) {
    $("#popup_modal .spinner-overlay").hide();
    if(xhr && xhr.getResponseHeader("Content-Type") == "application/json") {
        var data;
        try {
            data = JSON.parse(response);
        }
        catch(err) {}
        if(data && data["status"] && data["status"] == "error" && data["message"]) {
            $("#popup_modal .modal-body").html('<span class="text-danger">Error: ' + data["message"] +  '</span>');
        }
    }
    if(status && status == "error") {
        $("#popup_modal .modal-body").html('<span class="text-danger">Error Loading Content!</span>');
    }
}

function reload_modal() {
    if(modal_url) {
        $("#popup_modal .modal-body").html("Loading..");
        show_spinner();
        $("#popup_modal .modal-body").load(modal_url, hide_spinner);
    }
}
function iframe_dialog(){
    $('.iframe-dialog').click(function(){
        var url = $(this).attr('data-url');
        var title = $(this).attr('data-title');
        if(title) {
            $('#iframe_dialog .modal-title').html(title);    
        }
        $('#iframe_dialog iframe').attr("src", url);
        $('#iframe_dialog').modal('show');
    });

}

function primary_modal(title, url) {
    if(!title) {
        title = $("#popup_modal .modal-title").html();
    }
    if(!url) {
        url = modal_url;
    }
    var $primary_modal = $("#popup_modal");
    if(!($primary_modal.data('bs.modal') || {}).isShown) {
        $primary_modal.modal('show');
    }
    $("#popup_modal .modal-title").html(title);
    $("#popup_modal .modal-body").html("Loading..");
    show_spinner();
    $("#popup_modal .modal-body").load(url, hide_spinner);
}



function second_modal(title, url) {
    $('#popup_modal').modal('hide');
    //var $second_modal = $("#secondary_modal");
    var $body = $(window.frameElement).parents('body'),
    $second_modal = $body.find('#secondary_modal');
    if(!($second_modal.data('bs.modal') || {}).isShown) {
        $second_modal.modal('show');
    }
    $second_modal.find('.modal-title').html(title);
    $second_modal.find('.modal-body').html("Loading..");
    $second_modal.find('.modal-body').load(url);
    //$("#secondary_modal .modal-title").html(title);
    //$("#secondary_modal .modal-body").html("Loading..");
    //$("#secondary_modal .modal-body").load(url);
}

function setup_autofill() {

    $('.autofill').each(function(i, input) {
        var url_pattern = $(this).attr('data-url');
        var field_name = $(this).attr('name');
        var id_field = $('input[data-autofill-for="' + field_name + '"]');

        $(input).typeahead({
            minLength: 2,
            autoSelect: false,
            source: function(query, process) {
                query = query.replace(/\//g, "");
                query = query.replace(/\./g, "");
                var url = url_pattern.replace(/\[search_text\]/, query);
                $.getJSON(url, function(response) {
                    console.log(response);
                    process(response['items']);
                });
            },
            displayText: function(item) {
                return item.text;
            },
            afterSelect: function(item) {
                if(id_field.length) {
                    id_field.val(item.id);
                }
            }
        });

    });
}

function get_comments(model){
    var url = '/g2/get_comments';
    if(model == "QuoteRequest"){
        var data = { ids: rfq_ids, model: model };
    }
    else if(model == "Order"){
        var data = { ids: order_ids, model: model };
    }
    
    $.post(url, data)
    .done(function(response) {
        if(response && response.status) {
            if(response.status == 'success' && response.comments) {
                for(i in response.comments) {
                    all_comments = response.comments[i];
                    html = "";
                    for(j in all_comments) {
                        comment = all_comments[j]; 
                        html += comment.user.name+": "+comment.text+"\r\n";
                    }
                    $('#'+comment.object_id).attr('title', html);
                    $('#'+comment.object_id).addClass("active-chat");
                }
            }
        }
    });
}

function get_mailbox_status() {
    var url = '/g2/get_mailbox_status';
    var data = { rfq_ids: rfq_ids };
    $.post(url, data)
    .done(function(response) {
        for(let i=0; i<response.length; i++) {
            if(response[i]['mail_availability'] > 0) {
               $('#mailbox_'+response[i]['rfq_id']).addClass("active-chat");
            }
        }
    });
}

$(function() {

    var tx_block = $('.page-block');
    model = tx_block.attr('data-model');

    if(model) {
        if(model == 'Order') {
            get_comments(model);
            orders_helper();

        }
        else if(model == 'QuoteRequest') {
            get_comments(model);
            rfqs_helper();
            get_mailbox_status();
        }
        else if(model == 'PurchaseOrder') {
            vpos_helper();
        }
    }
    
    // Fill modal with content from link href
    $("#popup_modal").on("show.bs.modal", function(e) {
        var link = $(e.relatedTarget);
        var href_url = false;
        if(link) {
            var href_url = link.attr("href");
        }
        if(href_url) {
            modal_url = link.attr("href");
            $(this).find(".modal-title").html(link.attr("data-title"));
            reload_modal();
        }
    });
    //Initialise popover
    $('[data-toggle="popover"]').popover();   
    // On Hiding Secondary Modal, Reload Primary Modal
    $("#secondary_modal").on("hidden.bs.modal", function(e) {
        primary_modal();
    });
    // Lazy Load CSS: Flags, Font Awesome
    var stylesheet_paths = [
        "/node_modules/flag-icon-css/css/flag-icon.min.css",
        "/packages/fontawesome-pro/css/all.min.css"
    ];

    var stylesheet_path, stylesheet_tag;
    for(i in stylesheet_paths) {
        stylesheet_path = stylesheet_paths[i];
        stylesheet_tag = '<link href="' + stylesheet_path +  '" rel="stylesheet">';
        $("head").append(stylesheet_tag);
    }

    $.getScript("/node_modules/typeahead.js/dist/bloodhound.min.js");
    $.getScript("/node_modules/bootstrap-3-typeahead/bootstrap3-typeahead.min.js", setup_autofill);
});

