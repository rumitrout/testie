function select_order_parts() {
    $('#bom-order-all').click(function(e){
        e.preventDefault();
        var checked = !$(this).data('checked');
        $('.cart-checkbox').prop('checked', checked);
        $(this).text(checked ? 'Unselect All' : 'Select All' )
        $(this).data('checked', checked);
    });
}
function select_quote_parts() {
    $('#bom-quote-all').click(function(e){
        e.preventDefault();
        var checked = !$(this).data('checked');
        $('.quote-checkbox').prop('checked', checked);
        $(this).text(checked ? 'Unselect All' : 'Select All' )
        $(this).data('checked', checked);
    });
}
function find_parts(){
    var id = 0;
    var items = [ ];
    $('#bom-table tr[data-status="searching"]').each(function(tr) {

        id = $(this).attr("data-id");
        items.push(id);

    });
    var url="/api/bom/crawl";
    var data = { 

        "items" : items,

    };
    if( items.length != 0){
        $.post(url, data)
        .done(function(response) {
            if(response && response.status) {
                if(response.status == 'success') {

                }
            }

        });

    }
}
function highlight_column(){
    var length = $('.mapping-select').length;

    for(var i = 0 ; i < length ;i++){
        $selected_value = $('.mapping-select').eq(i).val();
        if($selected_value == ""){
            $(".mapping-row").eq(i).addClass('background-warning');
        }
        else{
            $(".mapping-row").eq(i).removeClass('background-warning');
        }
    }
}
function check_valid_quantity(){
    $.each($('.bom-quantity'),function(){
        var quantity = parseInt($(this).val());
        var moq = parseInt($(this).parent().parent().find(".bom-moq").attr("data-moq"));
        var order_multiple = parseInt($(this).parent().parent().find(".bom-moq").attr("data-multiple"));
        var status = $(this).parent().parent().find(".bom-status").attr("data-status");
        var available = parseInt($(this).parent().parent().find(".bom-moq").attr("data-available"));
        var offer_id = $(this).parent().parent().attr('data-id');
        if(status == "published"){
            if(quantity < moq){
                $(this).addClass('border-danger');
                $(this).removeAttr( "name" );
                $(this).parent().parent().find(".bom-status").find(".text-success").html('.....');
                $(this).parent().parent().find('.error-msg').text('Match the MOQ!');
            }
            else if((quantity - moq) % order_multiple != 0){
                $(this).addClass('border-danger');
                $(this).removeAttr( "name" );
                $(this).parent().parent().find(".bom-status").find(".text-success").html('.....');
                $(this).parent().parent().find('.error-msg').text('Match the Order Multiple!');

            }
            else if(quantity > available){
                $(this).addClass('border-danger');
                $(this).removeAttr( "name" );
                $(this).parent().parent().find(".bom-status").find(".text-success").html('.....');
                $(this).parent().parent().find('.error-msg').text('Only '+ available +' Pieces Available!');
            }
            else{
                $(this).removeClass('border-danger');
                $(this).attr('name','quantity['+offer_id+']');
                $(this).parent().parent().find(".bom-status").find(".text-success").html('Ready to Buy');
                $(this).parent().parent().find('.error-msg').text(' ');
            }
            var qty_row = $(this);
            var url="/api/bom/get_price";
            var data = { 

                "quantity" : quantity,
                "offer_id"  : offer_id

            };
           
            $.post(url, data)
            .done(function(response) {
                if(response && response.status) {
                    if(response.status == 'success') {
                       if(!response.price){
                            $(qty_row).parent().parent().find(".bom-offer-price").find(".price").text('-');
                       }

                       $(qty_row).parent().parent().find(".bom-offer-price").find(".price").text(response.price.toFixed(3));
                    }  
                }

            });

            
        }

    });
}



$(function() {
    select_order_parts();
    select_quote_parts()
    if ($('.mpn').length == 0) { 
        $('.orange-row').hide();
    }
    highlight_column();
    $('.mapping-select').on('change', highlight_column);
    $('.bom-quantity').on('input', check_valid_quantity);
    check_valid_quantity();



});

