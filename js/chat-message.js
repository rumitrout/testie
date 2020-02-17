function comment_send(){
    $('#comment-send-btn').click( function(e) {
        var url = '/g2/send_comment';
        var text = $('#comment-text').val();
        if(text.length === 0){
        	$("#response").addClass("response-error");
        	$('#response').text("Please Enter Comment!");
        }
        else{
        	var view_params = $('.view-params');
	        var tx_id = view_params.attr('data-tx-id');
	        var model = view_params.attr('data-model');
	        var data = { id: tx_id, model: model, text: text };
	        
	        $.post(url, data)
	        .done(function(response) {
	            if(response && response.status) {
	                if(response.status == 'success' && response.msg) {
	                	$("#response").addClass("response-success");
	                    $('#response').text(response.msg);
	                }
	                if(response.status == 'error' && response.msg) {
	                    $("#response").addClass("response-error");
	                    $('#response').text(response.msg);
	                }
	            }
	        });  
        }
        
    }); 
}

$(function() { 
    comment_send();
});