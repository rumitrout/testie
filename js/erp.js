$(document).ready(function() {
    $('.js-example-basic-multiple').select2();
});
function setup_shipping_address() {
    var shipping_Div = $('#shipping-address').html();
    $('#demo-form-inline-checkbox').change(function() {
      if($(this).is(":checked")) {
        $("#shipping-address").remove();
        return;
      }
      else{
        $("#append-div").append("<div id='shipping-address'></div>")
        $("#shipping-address").append(shipping_Div);
      }
        
    });
      
}
function setup_packages() {
    var row_Div = $('#package-row').html();
    
    $('#package-add').click(function() {
        
        $("#package-header").append("<tr><td>&nbsp;</td></tr><tr class = default-row >"+row_Div+"</tr>");
        
        $('.default-row').each(function(i,row) {
           $(row).find('.is_broken').attr('value',i);
        });  
        
    });
    
  
}
function delete_row(ele) {
  //var table = parentNode;
  var rowCount = $("#package-header tr").size();
 
  if(rowCount === 3) {
    alert('Cannot delete the Last row');
    return;
  }
  var row = ele.parentNode.parentNode; 
  row.parentNode.removeChild(row); 
      
}
function setup_gst() {
  
   
   var country = $(this).find(":selected").val();

       if(country == 'IN'){
        $("#gst").show();
        $("#vat").hide();
       }
       else{
        $("#vat").show();
        $("#gst").hide();
       }
      
}

function setup_supplier_tier_change() {
    var $el = $('#input_supplier_type');
    if($el.length) {
        supplier_tier_change();
        $el.on('change',supplier_tier_change);
    }
}

function supplier_tier_change() {
    var tiers_allowed = {
        "public_authorized" : [ 1 ],
        "private_authorized" : [ 1 ],
        "disqualified" : [ 4 ],
        "private_independent" : [ 2, 3 ],
        "sourcing_qualified_stockist" : [ 1, 2, 3 ],
        "sourcing_qualified_broker" : [ 2, 3 ],
        "dnd_distributor":[1,2,3]
    };
    var supplier_type = $('#input_supplier_type').val();
    var supplier_tier = document.getElementById("input_supplier_tier");
    var default_val = $('#input_supplier_tier').attr('data-value');
    var tiers = [];
    var tier;
    supplier_tier.options.length = 0;
    for(type in tiers_allowed) {
        if(supplier_type == type) {
            tiers = tiers_allowed[type];
            for(i in tiers) {
                tier = tiers[i];
                supplier_tier.options[supplier_tier.options.length] = 
                    new Option('Tier ' + tier, tier);
            }
        }
    }
    $('#input_supplier_tier').val(default_val);
}



function package_type_change() {
  $("#trays").hide();
  $('#package_type').on('change', function() {
  
        var type = $(this).find(":selected").val();

       if(type == 'Tray' || type == 'Tube Box'){
        $("#trays").show();
       }
       else{
        $("#trays").hide();
       }  
    });
      
}
function private_message(){
    $(".dropdown dt a").on('click', function() {
    $(".dropdown dd ul").slideToggle('fast');
  });

  $(".dropdown dd ul li a").on('click', function() {
    $(".dropdown dd ul").hide();
  });

  function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
  }

  $(document).bind('click', function(e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
  });

  $('.mutliSelect input[type="checkbox"]').on('click', function() {
     var total = [ ];
    
      $(':checkbox:checked').each( function(){  //find the checked checkboxes and loop through them
          total.push(this.value); //add the values to the array
      });
      
      $('.multiSel').val(total);
  });
}
/*function client_dropdown_change() {

  $('#client').on('change', function() {
     var client_id = $(this).find(":selected").val();

      var url="/api/client/change";
         var data = { 
                    
                    "client_id" : client_id
          };
          if( client_id != 'false'){
          $.post(url, data)
              .done(function(response) {
                  if(response && response.status) {
                      if(response.status == 'success') {
                        // var arr = [];
                          var arr = response.user;
                          //console.log(arr);

                          $('#buyer').find('option').remove();
                          $('#buyer').append($('<option>', {value:"", text:"--Select Buyer--"}));

                          for( var i=0; i<arr.length; i++)
                           {
                            
                             $('#buyer').append($('<option>', {value:arr[i].id, text:arr[i].name}));

                           }
                           $('#buyer').removeAttr('disabled');
                           //window.location.href = "/quote/create";
                      }
                      else if(response.status == 'failed') {
                          $('#status').html('Unable to Load Users.');
                          
                      }
                  }
                
              });

          }
          
  });
  
}




function buyer_dropdown_change() {

  $('#buyer').on('change', function() {
     var user_id = $(this).find(":selected").val();

      var url="/api/buyer/change";
         var data = { 
                    
                    "user_id" : user_id
          };
          if( user_id != 'false'){
          $.post(url, data)
              .done(function(response) {
                  if(response && response.status) {
                      if(response.status == 'success') {
                        // var arr = [];
                          var arr = response.crfq;
                          var quote_arr = response.quote;
                          //console.log(arr);
                          $('#crfq').find('option').remove();
                          $('#quote').find('option').remove();
                          $('#crfq').append($('<option>', {value:"false", text:"--Select CRFQ--"}));
                          $('#quote').append($('<option>', {value:"", text:"--Select CQ--"}));
                          for( var i=0; i<arr.length; i++)
                           {
                            
                             $('#crfq').append($('<option>', {value:arr[i].id, text:arr[i].crfq_number}));

                           }
                           $('#crfq').removeAttr('disabled');

                           for( var i=0; i<quote_arr.length; i++)
                           {
                            
                             $('#quote').append($('<option>', {value:quote_arr[i].id, text:quote_arr[i].quote_number}));

                           }
                           $('#quote').removeAttr('disabled');
                         
                      }
                      else if(response.status == 'failed') {
                          $('#status').html('Unable to Load Dropdown.');
                          
                      }
                  }
                  
              });
        }
  });
}
function quote_dropdown_change() {

  $('#quote').on('change', function() {
     var quote_id = $(this).find(":selected").val();

      var url="/api/quote/change";
         var data = { 
                    
                    "quote_id" : quote_id
          };
          if( quote_id != 'false'){
          $.post(url, data)
              .done(function(response) {
                  if(response && response.status) {
                      if(response.status == 'success') {
                          var arr = response.quote;
                            //console.log(arr.items[0].mpn);
                             $('.mpn-offer-search').eq(0).val(arr.items[0].mpn);

                           
                      }
                      else if(response.status == 'failed') {
                          $('#status').html('Unable to Load Quotes.');
                          
                      }
                  }
                  select_buyer();
              });

          }
          
  });

}*/
function cq_client_change() {

  $('#cq_client').on('change', function() {
     var client_id = $(this).find(":selected").val();
     if(client_id == ''){
     window.location = '/select_redirect?redirect_url=__unset&client_id=__unset';
     }
     else{
      window.location = '/select_redirect?redirect_url=__unset&client_id=' + client_id;
     }
     
   });

}
function cq_buyer_change() {

  $('#cq_buyer').on('change', function() {
     var buyer_id = $(this).find(":selected").val();
     //var client_id = $('#cq_client').find(":selected").val();
     if(buyer_id == ''){
     window.location = '/select_redirect?redirect_url=__unset&buyer_id=__unset';
     }
     else{
      window.location = '/select_redirect?redirect_url=__unset&buyer_id=' + buyer_id;
     }
   });

}
function cq_crfq_change() {

  $('#crfq').on('change', function() {
     var crfq_id = $(this).find(":selected").val();
     if(crfq_id == ''){
     window.location = '/select_redirect?redirect_url=__unset&crfq_id=__unset';
     }
     else{
      window.location = '/select_redirect?redirect_url=__unset&crfq_id=' + crfq_id;
     }
   });

}
function cq_offer_change() {

  $('#offers').on('change', function() {
     var offer_id = $(this).find(":selected").val();
     //var crfq_id = $('#crfq').find(":selected").val();
     if(offer_id == ''){
     window.location = '/select_redirect?redirect_url=__unset&offer_id=__unset';
     }
     else{
      window.location = '/select_redirect?redirect_url=__unset&offer_id=' + offer_id;
     }
   });

}
function crfq_client_change() {

  $('#crfq_client').on('change', function() {
     var client_id = $(this).find(":selected").val();
     if(client_id == ''){
     window.location = '/select_redirect?redirect_url=__unset&client_id=__unset';
     }
     else{
      window.location = '/select_redirect?redirect_url=__unset&client_id=' + client_id;
     }
     
   });

}
function crfq_buyer_change() {

  $('#crfq_buyer').on('change', function() {
     var buyer_id = $(this).find(":selected").val();
     //var client_id = $('#crfq_client').find(":selected").val();
    if(buyer_id == ''){
        window.location = '/select_redirect?redirect_url=__unset&buyer_id=__unset';
      }
    else{
       window.location = '/select_redirect?redirect_url=__unset&buyer_id=' + buyer_id;
    }
   });

}
function cpo_client_change() {

  $('#cpo_client').on('change', function() {
     var client_id = $(this).find(":selected").val();
     if(client_id == ''){
     window.location = '/select_redirect?redirect_url=__unset&client_id=__unset';
     }
     else{
      window.location = '/select_redirect?client_id=' + client_id;
     }
   });

}
function cpo_buyer_change() {

  $('#cpo_buyer').on('change', function() {
     var buyer_id = $(this).find(":selected").val();
    // var client_id = $('#cpo_client').find(":selected").val();
     if(buyer_id == ''){
        window.location = '/select_redirect?redirect_url=__unset&buyer_id=__unset';
      }
    else{
       window.location = '/select_redirect?redirect_url=__unset&buyer_id=' + buyer_id;
    }
   });

}
function cpo_quote_change() {

  $('#cpo_quote').on('change', function() {
     var quote_id = $(this).find(":selected").val();
    // var client_id = $('#cpo_client').find(":selected").val();
     if(quote_id == ''){
        window.location = '/select_redirect?redirect_url=__unset&quote_id=__unset';
      }
    else{
       window.location = '/select_redirect?redirect_url=__unset&quote_id=' + quote_id;
    }
   });

}
function vrfq_supplier_change() {

  $('#vrfq_supplier').on('change', function() {
     var supplier_id = $(this).find(":selected").val();
     if(supplier_id == ''){
     window.location = '/select_redirect?redirect_url=__unset&supplier_id=__unset';
     }
     else{
      window.location = '/select_redirect?redirect_url=__unset&supplier_id=' + supplier_id;
     }
     
   });
}
function vrfq_seller_change() {

  $('#vrfq_seller').on('change', function() {
     var seller_id = $(this).find(":selected").val();
     //var supplier_id = $('#vrfq_supplier').find(":selected").val();
    if(seller_id == ''){
        window.location = '/select_redirect?redirect_url=__unset&seller_id=__unset';
      }
    else{
       window.location = '/select_redirect?redirect_url=__unset&seller_id=' + seller_id;
    }
                   
   });
}
function vrfq_crfq_change() {

  $('#crfq_dropdown').on('change', function() {
     var crfq_id = $(this).find(":selected").val();
     //var supplier_id = $('#vrfq_supplier').find(":selected").val();
    if(crfq_id == ''){
        window.location = '/select_redirect?redirect_url=__unset&crfq_id=__unset';
      }
    else{
       window.location = '/select_redirect?redirect_url=__unset&crfq_id=' + crfq_id;
    }
                   
   });

}
function vq_supplier_change() {

  $('#vq_supplier').on('change', function() {
     var supplier_id = $(this).find(":selected").val();
     if(supplier_id == ''){
     window.location = '/select_redirect?redirect_url=__unset&supplier_id=__unset';
     }
     else{
      window.location = '/select_redirect?redirect_url=__unset&supplier_id=' + supplier_id;
     }
     
   });
}
function vq_seller_change() {

  $('#vq_seller').on('change', function() {
    var seller_id = $(this).find(":selected").val();
    if(seller_id == ''){
        window.location = '/select_redirect?redirect_url=__unset&seller_id=__unset';
      }
    else{
       window.location = '/select_redirect?redirect_url=__unset&seller_id=' + seller_id;
    }
   });

}
function vq_vrfq_change() {

  $('#vrfq').on('change', function() {
     var vrfq_id = $(this).find(":selected").val();
    if(vrfq_id == ''){
        window.location = '/select_redirect?redirect_url=__unset&vrfq_id=__unset';
      }
    else{
       window.location = '/select_redirect?redirect_url=__unset&vrfq_id=' + vrfq_id;
    }
   });

}
function vpo_supplier_change() {

  $('#vpo_supplier').on('change', function() {
     var supplier_id = $(this).find(":selected").val();
     if(supplier_id == ''){
     window.location = '/select_redirect?redirect_url=__unset&supplier_id=__unset';
     }
     else{
      window.location = '/select_redirect?redirect_url=__unset&supplier_id=' + supplier_id;
     }
     
   });
}
function vpo_seller_change() {

  $('#vpo_seller').on('change', function() {
     var seller_id = $(this).find(":selected").val();
     if(seller_id == ''){
        window.location = '/select_redirect?redirect_url=__unset&seller_id=__unset';
      }
    else{
       window.location = '/select_redirect?redirect_url=__unset&seller_id=' + seller_id;
    }
   });

}
function po_order_change() {

  $('#order').on('change', function() {
     var order_id = $(this).find(":selected").val();
    if(order_id == ''){
        window.location = '/select_redirect?redirect_url=__unset&order_id=__unset';
      }
    else{
       window.location = '/select_redirect?redirect_url=__unset&order_id=' + order_id;
    }
   });

}
function billing_entity_change() {

  $('#billing_entity').on('change', function() {
     var billing_entity = $(this).find(":selected").val();
     if(billing_entity == ''){
     window.location = '/select_redirect?redirect_url=__unset&billing_entity=__unset';
     }
     else{
      window.location = '/select_redirect?redirect_url=__unset&billing_entity=' + billing_entity;
     }
     
   });
}
function shipping_entity_change() {

  $('#shipping_entity').on('change', function() {
     var shipping_entity = $(this).find(":selected").val();


        window.location = '/select_redirect?redirect_url=__unset&shipping_entity=' + shipping_entity;
     
     
   });
}
function delivery_change() {

  $('#delivery').on('change', function() {
     var delivery_term = $(this).find(":selected").val();


        window.location = '/select_redirect?redirect_url=__unset&delivery_term=' + delivery_term;
     
     
   });
}
function availability_change() {
  $("#input_lead_time").hide();
  $("#input_lead_time_text").hide();
  $("#input_lead_time_label").hide();
  $('#input_availability').on('change', function() {
     var availability = $(this).find(":selected").val();
     if(availability == 'In Stock'){

        $("#input_lead_time").hide();
        $("#input_lead_time_text").hide();
        $("#input_lead_time_label").hide();
        $("#input_lead_time").removeAttr("required");
     }
     else{
         if(availability == 'Available'){
            $("#input_lead_time_text").text(" In Days");
            $("#input_lead_time").attr("required","true");
            $("#input_lead_time").show();
            $("#input_lead_time_text").show();
            $("#input_lead_time_label").show();
          }
        
     }
     
   });

}
function tx_availability_change() {
  var availability;
  $('.item-availability').on('change', function() {
        
        $('.tx-item-row').each(function(i, tr) {
          
          availability = $(tr).find('.item-availability').val();
          if(availability == "Available"){
              $(tr).find('.item-lead_time').removeAttr('disabled');
              $(tr).find('.item-quantity').removeAttr('disabled');
              $(tr).find('.item-price').removeAttr('disabled');

          }
          else if(availability == 'No Stock'){
             $(tr).find('.item-lead_time').val("");
             $(tr).find('.item-lead_time').attr('disabled','disabled');
             $(tr).find('.item-quantity').val("0").attr('disabled','disabled');
             $(tr).find('.item-price').val("0").attr('disabled','disabled');
             $(tr).find('.item-linevalue').text("0");
             $(tr).find('.item-profit').text("0");
            
          }
          else{
             $(tr).find('.item-lead_time').val("");
             $(tr).find('.item-lead_time').attr('disabled','disabled');
             $(tr).find('.item-quantity').removeAttr('disabled');
             $(tr).find('.item-price').removeAttr('disabled');
          }

        });
        get_tx_item_price();
        
     
   });

}

function on_template_change() {
     //var template = $('#template').find(":selected").val();
     var user = $('#user').find(":selected").val();
    //alert(user);
     var page = $('#page-content');
     model = page.attr('data-model');
     id = page.attr('data-id');
   
     window.location = '/set/template/'+ model + '/'+user+ '/' + id;
}

function template_change() {
    $('#user').on('change', on_template_change);
    //$('#template').on('change', on_template_change);
}

function select_all() {

  $('#select_all').click( function(e) {
    e.preventDefault();
    $('#select_packages option').prop('selected', true);
    $("#select_packages ").trigger('change');

  });
}

function preview(){
    $(".preview-button").click(function(e){
        e.preventDefault();
        $.niftyAside('fixedPosition');
        $.niftyAside('show');
        var id = $(this).attr('data-id');
        var flag = $(this).attr('flag');
        if( flag == 'client'){
        $('#preview-container').load('/client/view/'+ id + '/true');
        }
        if( flag == 'buyer'){
          $('#preview-container').load('/buyer/view/'+ id + '/true');
        }
         if( flag == 'contact'){
          $('#preview-container').load('/contact/view/'+ id + '/true');
        }
        if( flag == 'crfq'){
          $('#preview-container').load('/quote_request/view/'+ id + '/true');
        }
        if( flag == 'quote'){
        $('#preview-container').load('/quote/view/'+ id + '/true');
        }
        if( flag == 'order'){
        $('#preview-container').load('/order/view/'+ id + '/true');
        }
        if( flag == 'invoice'){
        $('#preview-container').load('/invoice/view/'+ id + '/true');
        }
        if( flag == 'supplier'){
        $('#preview-container').load('/supplier/view/'+ id + '/true');
        }
        if( flag == 'vrfq'){
        $('#preview-container').load('/vendor_quote_request/view/'+ id + '/true');
        }
        if( flag == 'seller'){
        $('#preview-container').load('/seller/view/'+ id + '/true');
        }
        if( flag == 'vendor_quote'){
        $('#preview-container').load('/vendor_quote/view/'+ id + '/true');
        }
        if( flag == 'purchase_order'){
        $('#preview-container').load('/vendor_purchase_order/view/'+ id + '/true');
        }
        $('#hide-preview').css('visibility','visible');
        return false;
    });
    $("#hide-preview").click(function(e){
        e.preventDefault();
        $.niftyAside('hide');
        $('#hide-preview').css('visibility','hidden');
        return false;
    });    
}

/*function crfq_arguments(){
  var hash = location.hash;
  hash = hash.substr(1);
  tokens = hash.split('/');
  client_id = tokens[0];
  $('#client').val(client_id);
  $('#client').trigger('change');
}
function select_buyer(){
  var hash = location.hash;
  hash = hash.substr(1);
  tokens = hash.split('/');
  buyer_id = tokens[1];
  $('#buyer').val(buyer_id); 
}*/
function autocomplete(){

  $("#demo-select2").select2({
    ajax: {
      url: "/api/search/offer",
      dataType: 'json',
      delay: 250,
    
    },

  });
}
function name_autocomplete(){

  $("#name-select2").select2({
    ajax: {
      url: "/api/search/name",
      dataType: 'json',
      delay: 250,
    
    },

  });


}
function supplier_name_autocomplete(){

  $("#supplier-name-select2").select2({
    ajax: {
      url: "/api/search/supplier_name",
      dataType: 'json',
      delay: 250,
    
    },

  });

  $('#supplier-name-select2').on('change', function(e) {
    $(this).closest('form').submit();
  });

  $('.select2-clear').click(function(e) {
    var target = $(this).attr('data-target');
    $(target).val(null).trigger('change');
  });

}
function mpn_autocomplete(){

  $("#mpn-select2").select2({
    ajax: {
      url: "/api/search/mpn",
      dataType: 'json',
      delay: 250,
    
    },

  });
}
function package_autocomplete(){

  $(".package").select2({
    ajax: {
      url: "/api/search/mpn",
      dataType: 'json',
      delay: 250,
    
    },

  });
}
function warehouse_item_change() {

  $('#mpn-select2').on('change', function() {
     var id = $(this).find(":selected").val();
     var order_id = $("#id").val();
     window.location = '/set_invoice_item/' + id + '/' + order_id;
     
   });

}
function buyer_autocomplete(){

  $("#buyer-select2").select2({
    ajax: {
      url: "/api/buyer/search/name",
      dataType: 'json',
      delay: 250,
    
    },

  });
}
$(document).ready(function() {
  $(".supplier_search").select2({
    ajax: {
    url: '/api/search/supplier',
    delay: 250
    }
  });
});
function add_item(){
    // $('#mpn-table').hide();
    // $('#hidden-row').hide();
    $("#set-item").click(function(){
      var part_id = $('#demo-select2').find(":selected").val();
      var back_url = $('#back_url').val();
      //alert(back_url);
      var model = $('#model').val();
      var object_id = $('#object_id').val();
      var url="/api/item/set";
         var data = { 
                    
                    "part_id" : part_id,
                    "back_url" : back_url
          };
          if( part_id != 'false'){
          $.post(url, data)
              .done(function(response) {
                  if(response && response.status) {
                      if(response.status == 'success') {
                         $('#default-text').hide();
       
                          /*var arr = response.part;
                          var price = response.price;
                             $('#mpn').text(arr.mpn);
                             $('#mfr').text(arr.extra.supplier_name);
                             $('#price').val(price);
                             $('#quantity').val(arr.quantity);
                             $('#part_id').val(arr._id.$id);
                             var line_value = Math.round(arr.market_price * arr.quantity);
                             $('#line-value').text(line_value);*/
                             $('#mpn-table').show(); 
                              if(back_url == 'order'){
                                window.location.href = "/order/create";
                              }
                              else if (back_url == 'quote') {
                                window.location.href = "/quote/create";
                              }
                              else if (back_url == 'quote_request') {
                                window.location.href = "/quote_request/create";
                              }
                              else if (back_url == 'vendor_quote_request') {
                                window.location.href = "/vendor_quote_request/create";
                              }
                              else if (back_url == 'vendor_quote') {
                                window.location.href = "/vendor_quote/create";
                              }else if (back_url == 'vendor_quote') {
                                window.location.href = "/vendor_quote/create";
                              }
                              else if (back_url == 'purchase_order') {
                                window.location.href = "/vendor_purchase_order/create";
                              }
                              else if (back_url == 'purchase_order') {
                                window.location.href = "/vendor_purchase_order/create";
                              }
                              else if (back_url == 'item_add') {
                                window.location.href = "/item/add/"+model+'/'+object_id;
                              }
                              else if (back_url == 'supplier_item_add') {
                                window.location.href = "/supplier/item/add/"+model+'/'+object_id;
                              }
                             $('#item_modal').modal('hide');
                      }
                      else if(response.status == 'not_available') {
                          $('#status').html('This Part is Not Published!');
                           $('#item_modal').modal('hide');
                          
                      }
                  }
                 
              });

          }
     });
}
function add_mpn(){
   
    $("#set-mpn").click(function(){
      var part_id = $('#demo-select2').find(":selected").val();
   
      var url="/api/mpn/set";
         var data = { 
                    
                    "part_id" : part_id
                    
          };
          if( part_id != 'false'){
          $.post(url, data)
              .done(function(response) {
                  if(response && response.status) {
                      if(response.status == 'success') {
                       
                          window.location.href = "/seller/parts";
                              
                            
                      }
                      
                  }
                 
              });

          }
     });
}
function get_price(){
         $('#status').hide();
         var items = [];
         
        $('.item-row').each(function(i, tr) {
          var item = {};
          item['quantity'] = $(tr).find('.item-quantity').val();
          item['date_code'] = $(tr).find('.item-date_code').val();
          item['price'] = $(tr).find('.item-price').val();
          item['index'] = $(tr).find('.item-index').val();
          //console.log(item);
          items.push(item);
        });
        var back_url = $('#back_url').val();
        //console.log(back_url);
        var data = { items: items, "back_url" :back_url };
          var url = '/api/items/update';
          $.post(url, data)
              .done(function(response) {
                  if(response && response.status) {
                      if(response.status == 'success') {
                         $('#default-text').hide();
                          var data = response.line_values;
                          var prices = response.prices;
                          var date_codes = response.date_codes;
                          var gross_profits = response.gross_profits;
                          //console.log(data);
                           $(data).each(function(i, line_value) {
                              $('.item-row').eq(i).find('.item-linevalue').html(line_value);
                            });
                           $(prices).each(function(i, price) {
                              $('.item-row').eq(i).find('.item-price').val(price);
                            });
                           $(date_codes).each(function(i, date_code) {
                              $('.item-row').eq(i).find('.item-date_code').val(date_code);
                            });
                           $(gross_profits).each(function(i, gross_profit) {
                              $('.item-row').eq(i).find('.item-profit').html(gross_profit + '%');
                            });
                          
                      }
                      else if(response.status == 'not_applicable') {
                          $('#status').show();
                          $('#status').html('Price Not Available For Given Quantity!');
                          
                      }
                  }
                 
              });

}
function get_tx_item_price(){
        $('#status').hide();
         var items = [];
        $('.tx-item-row').each(function(i, tr) {
          var item = {};
          item['quantity'] = $(tr).find('.item-quantity').val();
          item['date_code'] = $(tr).find('.item-date_code').val();
          item['availability'] = $(tr).find('.item-availability').val();
          item['lead_time'] = $(tr).find('.item-lead_time').val();
          item['price'] = $(tr).find('.item-price').val();
          item['index'] = $(tr).find('.item-index').val();
          items.push(item);
        });
        var back_url = $('#back_url').val();
        var object = $('#object').val();
        
        var data = { items: items, "back_url" :back_url,"object" :object};
          var url = '/api/tx_items/update';
          $.post(url, data)
              .done(function(response) {
                  if(response && response.status) {
                      if(response.status == 'success') {
                         $('#default-text').hide();
                          var data = response.line_values;
                          var prices = response.prices;
                          var date_codes = response.date_codes;
                          var availabilities = response.availabilities;
                          var lead_times = response.lead_times;
                          var gross_profits = response.gross_profits;
                         
                           $(data).each(function(i, line_value) {
                              $('.tx-item-row').eq(i).find('.item-linevalue').html(line_value);
                            });
                           $(prices).each(function(i, price) {
                              $('.tx-item-row').eq(i).find('.item-price').val(price);
                            });
                           $(date_codes).each(function(i, date_code) {
                              $('.tx-item-row').eq(i).find('.item-date_code').val(date_code);
                            });
                           $(lead_times).each(function(i, lead_time) {
                              $('.tx-item-row').eq(i).find('.item-lead_time').val(lead_time);
                            });
                           $(availabilities).each(function(i, availability) {
                              $('.tx-item-row').eq(i).find('.item-availability').val(availability).attr('selected','selected');
                            });
                           $(gross_profits).each(function(i, gross_profit) {
                              $('.tx-item-row').eq(i).find('.item-profit').html(gross_profit + '%');
                            });
                          
                      }
                  }
                 
              });

}
/*function on_items_change(){
  var data['items'] = [];
  $('.item-row').each(function(i, tr) {
    var item['quantity'] = $(tr).find('.item-quantity').val();
    var item['price'] = $(tr).find('.item-price').val();
    var item['index'] = $(tr).find('.iten-index').val();
    data.items.push(item);
  });
  console.log(data);
  //$.post({
   // data: data
  //});
 /* .success(function(data) {
    $(data).each(i, line_value) {
      $('item-row').eq(i).find('item-linevalue').html(line_value);
    }
  });
} */

function select2_autocomplete() {
    $('.select2-autocomplete').each(function(i, select_elem) {
        var url = $(select_elem).attr('data-url');
        console.log(url);
        $(select_elem).select2({
            ajax: {
                url: url,
                dataType: 'json',
                delay: 250
            }
        });
    });
}
function refresh_account(){
    $("#refresh-button").click(function(e){
        e.preventDefault();
        var object_id = $(this).attr('data-id');
        var object_model = $(this).attr('data-model');
        if (confirm("Are you sure? You want to Refresh Account Details!") == true) {
        //alert(object_id);
        window.location = '/account/refresh/'+object_id+'/'+object_model;   
       } 
    });
    return false;
}
function refresh_account_vq(){
    $("#refresh-button-vq").click(function(e){
        e.preventDefault();
        var object_id = $(this).attr('data-id');
        var object_model = $(this).attr('data-model');
        if (confirm("Are you sure? You want to Refresh Account Details!") == true) {
        //alert(object_id);
        window.location = '/account/refresh/'+object_id+'/'+object_model;  
       } 
    });
    return false;
}
function refresh_account_quote(){
    $("#refresh-button-quote").click(function(e){
        e.preventDefault();
        var object_id = $(this).attr('data-id');
        var object_model = $(this).attr('data-model');
        if (confirm("Are you sure? You want to Refresh Account Details!") == true) {
        //alert(object_id);
        window.location = '/account/refresh/'+object_id+'/'+object_model;  
       } 
    });
    return false;
}
function refresh_account_order(){
    $("#refresh-button-order").click(function(e){
        e.preventDefault();
        var object_id = $(this).attr('data-id');
        var object_model = $(this).attr('data-model');
        if (confirm("Are you sure? You want to Refresh Account Details!") == true) {
        //alert(object_id);
        window.location = '/account/refresh/'+object_id+'/'+object_model;  
       } 
    });
    return false;
}
function remove_line_card(){
    $(".remove-line-card").click(function(e){
        e.preventDefault();
        var object_id = $(this).attr('data-id');
        var object_brand = $(this).attr('data-brand');
        var key = $(this).attr('data-key');
        if (confirm("Are you sure? You want to Remove Line Card!") == true) {
        //alert(object_id);
        window.location = '/supplier/line_card/remove/'+object_id+'/'+object_brand+'/'+key;   
       } 
    });
    return false;
}
function show_opens(){
    $(".opens").hide();
    $(".show-opens").mouseover(function(){
       $(".opens").show(); 
    });
    $(".show-opens").mouseout(function(){
       $(".opens").hide(); 
    });
    return false;
}
function show_clicks(){
    $(".clicks").hide();
    $(".show-click").mouseover(function(){
       $(".clicks").show(); 
    });
    $(".show-clicks").mouseout(function(){
       $(".clicks").hide(); 
    });
    return false;
}
function search_vq(){
    $('#search_vq').bind('input', function() {
      var input = $('#search_vq').val();
          var data = { "mpn" : input};
            var url = '/api/search_vq';
            $.post(url, data)
                .done(function(response) {
                    if(response && response.status) {
                        if(response.status == 'success') {
                           
                           var arr = response.quotes;
                            $('#map_vq').find('option').remove();
                            $('#map_vq').append($('<option>', {value:"", text:"--Select Vendor Quote--"}));

                            for( var i=0; i<arr.length; i++)
                             {
                              
                               $('#map_vq').append($('<option>', {value:arr[i].id, text:arr[i].text}));

                             }
                           
                            
                        }
                    }
                   
                });

    });
}
function setup_autocomplete() {

    $('.autocomplete').each(function(i, input) {
        $input = $(input);
        var api_search_prefix = $input.data('search-prefix');
        var api_search_suffix = $input.data('search-suffix');
        if(!api_search_prefix) return;
        $input.typeahead({
            minLength: 2,
            autoSelect: false,
            source: function(query, process) {
                query_encoded =  encodeURIComponent(query.replace(/\//g, ""));
                query_encoded =  encodeURIComponent(query.replace(/\./g, " "));
                var api_search_url = api_search_prefix + query_encoded + api_search_suffix;
                $.getJSON(api_search_url, function(response) {
                    process(response);
                });
            }
        });
    });
    $('.autocomplete').keydown(function(e) {
        if(e.which == 13) {
            e.preventDefault();
            $(this).closest('form').submit();
        }
       
    });

    $('.autocomplete-clear').click(function() {

         $(this).closest('form').submit();

    });

}
function form_submit(){
   $( "#tx-form-btn" ).click(function() {
    $( "#tx-form" ).submit();
  });

}


function follow_up_done(){
    $(".follow-up-done").click(function(e){
        e.preventDefault();
        var object_id = $(this).attr('data-id');
        var text = prompt("Enter Description Here");
        if(text) {   
           var url="/follow_up/done";
           var data = { 
                      
                      "id" : object_id,
                      "text" : text
                      
            };
           
            $.post(url, data)
                .done(function(response) {
                    if(response && response.status) {
                        if(response.status == 'success') {
                            
                            window.location.href = "/follow_ups";         
                              
                        }
                        
                    }
                   
                });

          }
      });
}
function confirm_labels(){
    $("#confirm-labels").click(function(){
        
        if (confirm("Please confirm that all labels are printed and pasted.")) {
            $( "#confirm-form" ).submit();
        } 
    });
    return false;
}

function is_title_case(t) {
    var reFirstLetter = /^[A-Z0-9]/;
    if(!reFirstLetter.test(t)) {
        return false;
    }
    var reHasSmall = /[a-z]/;
    if(!reHasSmall.test(t)) {
        return false;
    }
    return true;
}

function validate_fields() {
    $('form').on('submit', function(e) {
        var $title_field = $(this).find('.validate-title-case');
        if(!($title_field.length)) {
            return true;
        }
        var $submit_group = $(this).find('.submit-form-group');
        var input_value = $title_field.find('input').val();
        if(!is_title_case(input_value)) {
            $title_field.addClass("has-error");
            $title_field.find(".help-block").html('Please use title case. eg: "Algebra Corporation"');
            $submit_group.addClass("has-error");
            $submit_group.find(".help-block").html('Form has errors. Please correct.');
            e.preventDefault();
            return false;
        }
        else {
            $title_field.removeClass("has-error");
            $title_field.find(".help-block").html('');
            $submit_group.removeClass("has-error");
            $submit_group.find(".help-block").html('');
            return true;
        }
    });
}
function publish_warehouse_part(){
   $('#publish-part').change(function() {
        var id = $('#id').val();
        var url="/wh/publish_part";
        var data = { 
                  "is_publish" : this.checked,
                  "id" : id
                };
           
            $.post(url, data)
                .done(function(response) {
                    if(response && response.status) {
                        if(response.status == 'success') {
                            
                            window.location.href = "/wh/part/view/"+id;         
                              
                        }
                        
                    }
                   
                });
        
   });
}

function iframe_dialog(){
    $('.iframe-dialog').click(function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        var title = $(this).attr('data-title');
        if(title) {
            $('#iframe_dialog .modal-title').html(title);
        }
        $('#iframe_dialog iframe').attr("src", url);
        $('#iframe_dialog').modal('show');
        return false;
    });

}


$(function() { 
    confirm_labels();
    show_opens();
    show_clicks();
    setup_shipping_address();
    form_submit();
    setup_autocomplete();
    //client_dropdown_change();
    follow_up_done();
    remove_line_card();
    refresh_account_vq();
    refresh_account_order();
    refresh_account_quote();
    refresh_account();
    cq_client_change();
    cq_buyer_change();
    cq_crfq_change();
    cq_offer_change();
    crfq_client_change();
    crfq_buyer_change();
    cpo_client_change();
    cpo_buyer_change();
    vrfq_supplier_change();
    vrfq_seller_change();
    vq_supplier_change();
    vq_seller_change();
    vq_vrfq_change();
    vpo_supplier_change();
    vpo_seller_change();
    po_order_change();
    vrfq_crfq_change();
    cpo_quote_change();
    availability_change();
    //tx_availability_change();
    preview();
   
    autocomplete();
    add_item();
 
    $('.item-input').change(get_price);
    $('.tx-item-input').change(get_tx_item_price);
 
    select2_autocomplete();
    name_autocomplete(); 
    mpn_autocomplete(); 
    package_autocomplete(); 
    buyer_autocomplete();
    template_change();
    add_mpn();
    private_message();
    search_vq();
    $('#country').change(setup_gst);
    setup_supplier_tier_change();
    package_type_change();
    setup_packages();
    warehouse_item_change();
    select_all();
    validate_fields();
    supplier_name_autocomplete();
    billing_entity_change();
    shipping_entity_change();
    delivery_change();
    publish_warehouse_part();
    iframe_dialog();
});

