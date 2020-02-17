function setup_search_widget() {
    $input = search_widget({
        activate_submit: true
    });
}
function update_quantity(){
	$('.update-quantity').hide();
	$('.edit-quantity').click(function(e){
		e.preventDefault();
        var index  =  $(this).attr('data-id');
        $('#fixed-quantity-'+index).hide();
        $('#update-quantity-'+index).show();
	
	})
}

function save_cart_count() {
    if("cart_count" in window) {
        localStorage.setItem("cart_count", cart_count);
    }
    else {
        localStorage.setItem("cart_count", 0);
    }
}

$(function() {
    setup_search_widget();
    update_quantity();
    save_cart_count();
});

