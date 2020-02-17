$('#user_id').on('change', function() {
   var user_id = $(this).find(":selected").val();

    var url="/api/dropdown/change";
       var data = { 
                  
                  "user_id" : user_id
        };
        $.post(url, data)
            .done(function(response) {
                if(response && response.status) {
                    if(response.status == 'success') {
                    	// var arr = [];
                        var arr = response.crfq;
                        //console.log(arr);
                        $('#crfq_select').find('option').remove();
                        for( var i=0; i<arr.length; i++)
                         {
                         	
                         	 $('#crfq_select').append($('<option>', {value:arr[i].id, text:arr[i].crfq_number}));

                         }
                         
                    }
                    else if(response.status == 'failed') {
                        $('#status_text').html('Unable to Load crfqs.');
                        
                    }
                }
            });
});



$('#seller_select').on('change', function() {
   var supplier_id = $(this).find(":selected").val();

    var url="/api/supplier_dropdown/change";
       var data = { 
                  
                  "supplier_id" : supplier_id
        };
        $.post(url, data)
            .done(function(response) {
                if(response && response.status) {
                    if(response.status == 'success') {
                        // var arr = [];
                        var arr = response.vrfq;
                        //console.log(arr);
                        $('#vrfq_select').find('option').remove();
                        for( var i=0; i<arr.length; i++)
                         {
                            
                             $('#vrfq_select').append($('<option>', {value:arr[i].id, text:arr[i].vrfq_number}));

                         }
                         
                    }
                    else if(response.status == 'failed') {
                        $('#status_text').html('Unable to Load vrfqs.');
                        
                    }
                }
            });
});
$('#user_select').on('change', function() {
   var user_id = $(this).find(":selected").val();

    var url="/api/quote/dropdown_change";
       var data = { 
                  
                  "user_id" : user_id
        };
        $.post(url, data)
            .done(function(response) {
                if(response && response.status) {
                    if(response.status == 'success') {
                        // var arr = [];
                        var arr = response.quote;
                        //console.log(arr);
                        $('#quote_select').find('option').remove();
                        $('#quote_select').append($('<option>', {value:"", text:"Select Quote"}));
                        for( var i=0; i<arr.length; i++)
                         {
                            
                             $('#quote_select').append($('<option>', {value:arr[i].id, text:arr[i].quote_number}));

                         }
                         
                    }
                    else if(response.status == 'failed') {
                        $('#status_text').html('Unable to Load CQs.');
                        
                    }
                }
            });
});

