function setup_quantity_update() {
    $('.quantity-update').click(function(e) {
        e.preventDefault();
        var quantity = $(this).text().trim().replace(/,/g, '');
        $('.quantity-target').val(quantity);
        return false;
    })
}

function setup_rfq_dialog() {
    $('#rfq_dialog_button').click(function(e) {
        e.preventDefault();
        $('#rfq_dialog').modal();
        if("clicky" in window) {
            clicky.log('#rfq_dialog','RFQ Dialog');
        }
        return false;
    });
}

// function zoom_image() {
//     $('#part-image').click(function(e) {
//         var modal = document.getElementById('zoom-modal');
//         var img = document.getElementById('part-image');
//         var modalImg = document.getElementById("img01");
//         var captionText = document.getElementById("caption");
//         modal.style.display = "block";
//         modalImg.src = this.src;
//         if(captionText != null)
//         captionText.innerHTML = this.alt;
//     });
// }

// function close_zoom_outer() {
    
//     const modal = document.getElementById('zoom-modal');
//     $('body').on('click', function(e){
//         if(e.target.id != 'part-image' && modal.style.display == 'block') {
//             if(e.target.id !== 'zoom-modal' && e.target.id !== 'img01'){
//                 modal.style.display = 'none';
//             }
//         }

//     });
// }

// function close_zoom() {
//    $('.close').click(function(e) {
//     var modal = document.getElementById('zoom-modal');
//     var span = document.getElementsByClassName("close")[0];
//     modal.style.display = "none";


//    });
// }

function fullscreen(){
    $('#fullscreen').click(function(e) {
    e.preventDefault();
    document.getElementById("pdfiframe").contentWindow.PDFViewerApplication.pdfPresentationMode.request();
   });
}

function pdf_download(){
    $('#pdfdownload').click(function(e) {
    e.preventDefault();
    document.getElementById("pdfiframe").contentWindow.PDFViewerApplication.downloadManager.downloadUrl( document.getElementById("pdfiframe").contentWindow.PDFViewerApplication.url);
   });
}

function part_visited() {
    var device_number = get_set_device_number();
    if(!device_number) {
        device_number = '';
    }
    $.get(admin_base + "/public/part_visited/" + part_id + '?device_number=' + device_number);
}

function get_last_refreshed() {
    if(offer_id && offer_id != '') {
        $('.ajax-loader').show();
        $('.refresh-icon').hide();
        var url = '/api/part/get_refreshed/' + offer_id;
        $.getJSON(url, function(response) {
            if(response && response["last_refreshed"]) {
                $('.last-updated').html('Last Refreshed: ' + response['last_refreshed']);
                $('.ajax-loader').hide();
                $('.refresh-icon').show();
            }
        });
    }
}

function get_availability_updated() {
    if(part_id && part_id != '') {
        var url = '/api/part/get_availability_updated/' + part_id;
        $.getJSON(url, function(response) {
            if(response && response["availability_updated"]) {
                $('.availability-updated').html('Availability Last Updated: ' + response['availability_updated']);
            }
        });
    }
}


function setup_refresh_stock() {
    $('.ajax-loader').hide();
    $('.refresh-button').click(function() {
        $('.ajax-loader').show();
        $('.refresh-icon').hide();
        var url = admin_base + "/api/refresh/stock";
        var data = { 
            "part_id" : part_id
        };
        $.post(url, data)
        .done(function(response) {
            $('.ajax-loader').hide();
            if(response && response.status) {
                if(response.status == 'success') {
                    if(response["changed"]) {
                        window.location.reload();
                    }
                    else {
                        get_last_refreshed();
                    }
                    return; 
                }
            }
        });
    });
}
function submit_rfq() {

    $('#submit-rfq-btn').click(function(e) {
        e.preventDefault();

        $(this).attr('disabled', true);
       
        var email  = $('#rfq_dialog').find('#input_email').val();
        var quantity  = $('#rfq_dialog').find('#input_quantity').val();
        var part_id  = $('#rfq_dialog').find('#part_id').val();
        var offer_id  = $('#rfq_dialog').find('#offer_id').val();
        var note  = $('#rfq_dialog').find('#note').val();
        if(email == "" || quantity == ""){
            $('.alert-text').text("Please Enter Email and Quantity!");
            $(this).attr('disabled', false);
            return false;
        }
        else if(quantity == 0){
            $('.alert-text').text("Please Enter Valid Quantity!");
            $(this).attr('disabled', false);
            return false;
        }
        else{
              var data = {
            "part_id" : part_id,
            "email" : email,
            "quantity" : quantity,
            "note" : note,
            "_token": $('#token').val(),
            "offer_id" : offer_id
            };
            var url = "/cart/rfq";
            $.post(url, data)
                .done(function(response) {
                    if(response && response.status) {
                        if(response.status == 'success') {
                             $('.alert-text').text(response.message).css("color", "green");
                             $('#input_email').val("");
                             $('#note').val("");
                             $('#input_quantity').val("");
                        }
                        else if(response.status == 'error'){
                            $('.alert-text').text(response.message);
                        }
                        else{
                            $('.alert-text').text('Error while submitting RFQ!');
                        }
                        //$("#rfq_dialog").hide();
                        //$('.modal-backdrop').remove();
                    }
            });
        }
      
    });
}
function clicky_events() {
    $('.sheild-text').click(function(e) {
        e.preventDefault();
        if("clicky" in window) {
            clicky.log('#purchase_protection','Purchase Protection');
        }
        return false;
    });
}
function additional_fields() {
    $('#country').hide();
    $('#email').on('input', function() {
        var email = $('#email').val();
        if(email.length){
            email = email.split('@');
            var name = email[0];
            var domain = email[1];
            if(domain == null || typeof(domain)  === "undefined"){
                $('.alert-text').text("Please Enter Valid Email Id!");
                
            }
            else{
                //$('.alert-text').hide();
                var domains = [
                      "aol.com", "att.net", "comcast.net", "facebook.com", "gmail.com", "gmx.com", "googlemail.com",
                      "google.com", "hotmail.com", "hotmail.co.uk", "mac.com", "me.com", "mail.com", "msn.com",
                      "live.com", "sbcglobal.net", "verizon.net", "yahoo.com", "yahoo.co.uk", "email.com",
                      "fastmail.fm", "games.com" , "gmx.net", "hush.com", "hushmail.com", "icloud.com",
                      "iname.com", "inbox.com", "lavabit.com", "love.com" , "outlook.com", "pobox.com",
                      "protonmail.com", "rocketmail.com" , "safe-mail.net", "wow.com" , "ygm.com",
                      "ymail.com" , "zoho.com", "yandex.com",  "bellsouth.net", "charter.net", "cox.net",
                      "earthlink.net", "juno.com", "btinternet.com", "virginmedia.com", "blueyonder.co.uk",
                      "freeserve.co.uk", "live.co.uk", "ntlworld.com", "o2.co.uk", "orange.net", "sky.com",
                      "talktalk.co.uk", "tiscali.co.uk", "virgin.net", "wanadoo.co.uk", "bt.com",
                      "sina.com", "sina.cn", "qq.com", "naver.com", "hanmail.net", "daum.net", "nate.com",
                      "yahoo.co.jp", "yahoo.co.kr", "yahoo.co.id", "yahoo.co.in", "yahoo.com.sg", "yahoo.com.ph",
                      "163.com", "126.com", "aliyun.com", "foxmail.com", "hotmail.fr", "live.fr", "laposte.net",
                      "yahoo.fr", "wanadoo.fr", "orange.fr", "gmx.fr", "sfr.fr", "neuf.fr", "free.fr",
                      "gmx.de", "hotmail.de", "live.de", "online.de", "t-online.de" , "web.de", "yahoo.de",
                      "libero.it", "virgilio.it", "hotmail.it", "aol.it", "tiscali.it", "alice.it", "live.it",
                      "yahoo.it", "email.it", "tin.it", "poste.it", "teletu.it", "mail.ru", "rambler.ru",
                      "yandex.ru", "ya.ru", "list.ru", "hotmail.be", "live.be", "skynet.be", "voo.be",
                      "tvcablenet.be", "telenet.be", "hotmail.com.ar", "live.com.ar", "yahoo.com.ar",
                      "fibertel.com.ar", "speedy.com.ar", "arnet.com.ar", "yahoo.com.mx", "live.com.mx",
                      "hotmail.es", "hotmail.com.mx", "prodigy.net.mx", "yahoo.com.br", "hotmail.com.br",
                      "outlook.com.br", "uol.com.br", "bol.com.br", "terra.com.br", "ig.com.br", "itelefonica.com.br",
                      "r7.com", "zipmail.com.br", "globo.com", "globomail.com", "oi.com.br"
                ];
                domain = domain.toLowerCase();
                if( $.inArray(domain, domains) !== -1 ) {
                    if("rfq_fields" in localStorage){
                         var additional_fields = JSON.parse(localStorage.rfq_fields);
                    }

                    $("#main-div").append("<div class=form-group> <input type=text class=form-control placeholder=Name* name=additional_fields[attention_to] id=attention_to required></div>"+
                        "<div class=form-group> <input type=text class=form-control placeholder=Company* name=additional_fields[company]  id=company required></div>"+
                        "<div class=form-group> <input type=text class=form-control placeholder=Phone* name=additional_fields[phone]  id=phone required></div>"+
                        "<div class=form-group> <input type=text class=form-control placeholder='Address Line 1*' name=additional_fields[address_line_1] id=address_line_1 required></div>"+
                        "<div class=form-group> <input type=text class=form-control placeholder='Address Line 2' name=additional_fields[address_line_2] id=address_line_2 required></div>"+
                        "<div class=form-group> <input type=text class=form-control placeholder=City* name=additional_fields[city]  id=city required></div>"+
                        "<div class=form-group> <input type=text class=form-control placeholder=State* name=additional_fields[state]  id=state required></div>");
                    $('#country').show();
                    $("#country").attr("required","true");
                } 
                else{
                    $("#main-div").empty();
                    $('#country').hide();
                    $("#country").removeAttr("required");
                }   
               
            }
            
        }
    });
}
function store_rfq(){
    $("#rfq-btn").click(function(e){
        e.preventDefault();

        //$('.alert-text').show();
        $(this).attr('disabled', true);
        var email = $('#email').val();
        var is_blank = false;
        var additional_fields = [ ];
        var fields = ['attention_to','company','phone','address_line_1','address_line_2','city','state','country'];
        if($("#main-div").html() != "" || null){
            $(fields).each(function(i, field) {
              var value = $('#'+field).val();
              if(field != 'address_line_2' && value == ""){
                is_blank = true;
              }
              var obj = { };
              obj[field] = value;
              additional_fields.push(obj);
            });
        }
        additional_fields.push({"email" : email});
        localStorage.rfq_fields = JSON.stringify(additional_fields);

        var quantity  = $('#form_pre_rfq').find('#input_quantity').val();
        var part_id  = $('#form_pre_rfq').find('#part_id').val();
        var offer_id  = $('#form_pre_rfq').find('#offer_id').val();
        var note  = $('#form_pre_rfq').find('#note').val();
        console.log('here');
        if(quantity == "" || email == ""){
            $('.alert-text').text('Please enter email and quantity!');
            $(this).attr('disabled', false);
        }
        else if(quantity == 0){
            $('.alert-text').text("Please Enter Valid Quantity!");
            $(this).attr('disabled', false);
            return false;
        }
        else if(is_blank){
            $('.alert-text').text('Please enter all required fields!');
            $(this).attr('disabled', false);
        }
        else{
            var data = {
            "part_id" : part_id,
            "email" : email,
            "quantity" : quantity,
            "note" : note,
            "_token": $('#token').val(),
            "additional_fields": additional_fields,
            "offer_id" : offer_id
            };
          
            var url = "/cart/rfq";
            $.post(url, data)
                .done(function(response) {
                    if(response && response.status) {
                        if(response.status == 'success') {
                             $('.alert-text').text(response.message).css("color", "green");
                             $('#form_pre_rfq').find("input[type=text], textarea").val("");
                        }
                        else if(response.status == 'error'){
                            $('.alert-text').text(response.message);
                        }
                        else{
                            $('.alert-text').text('Error while submitting RFQ!');
                        }
                        //$("#rfq_dialog").hide();
                        //$('.modal-backdrop').remove();
                    }
            });
        }
    }); 
}

function add_note(){
    $(".add-note-link").click(function(e) {
        e.preventDefault();
        $(".add-note-row").show(); 
        $(".add-note-link").hide();
    });
}

/*function on_rfq_submit() {
    $(".rfq-form").submit(function(e) {
        e.preventDefault();
        $(this).find(':submit').attr('disabled', true);
        field_names = [
            "email", "quantity"
        ];
        for(field_name in field_names) {
            var el = $(this).find(':input[name="' + field_name + '"]');
            if(el) {

            }
        }
        var email = $('#email').val();
        var additional_fields = [ ];
        var fields = ['attention_to','company','phone','address_line_1','address_line_2','city','state','country'];
        if($("#main-div").html() != "" || null){
            $(fields).each(function(i, field) {
              var value = $('#'+field).val();
              var obj = { };
              obj[field] = value;
              additional_fields.push(obj);
            });
        }
        additional_fields.push({"email" : email});
        localStorage.rfq_fields = JSON.stringify(additional_fields);

        var quantity  = $('#form_pre_rfq').find('#input_quantity').val();
        var part_id  = $('#form_pre_rfq').find('#part_id').val();
        var note  = $('#form_pre_rfq').find('#note').val();
        var offer_id  = $('#form_pre_rfq').find('#offer_id').val();
        var data = {
            "part_id" : part_id,
            "email" : email,
            "quantity" : quantity,
            "note" : note,
            "_token": $('#token').val(),
            "additional_fields": additional_fields,
            "method" : 'ajax',
            "offer_id" : offer_id
        };
        var url = "/cart/rfq";
        $.post(url, data)
            .done(function(response) {
                if(response && response.status) {
                    if(response.status == 'success') {
                         $('.message-status').text(response.message);
                          $('#form_pre_rfq').find("input[type=text], textarea").val("");
                    }
                    else{
                         $('.message-status').text('Error while submitting RFQ!');
                    }
                    //$("#rfq_dialog").hide();
                    //$('.modal-backdrop').remove();
                }
        });


    });     
}*/

function save_last_part_id() {
    if("part_id" in window) {
        localStorage.setItem("last_visited_part_id", part_id);
    }
}

//Set up each functinon on its own
// $(function() {
//     setup_quantity_update();
//     // zoom_image();
//     // close_zoom();
//     // close_zoom_outer();
//     fullscreen();
//     pdf_download();
//     // Enable Popover
//     $('[data-toggle="popover"]').popover();
//     setup_rfq_dialog();
//     get_availability_updated();
//     $(window).one('mousemove', get_last_refreshed);
//     $(window).one('mousemove', part_visited);
//     setup_refresh_stock();
//     clicky_events();
//     additional_fields();
//     store_rfq();
//     add_note();
//     submit_rfq();
//     save_last_part_id();
//     // on_rfq_submit();
// });

function togglePopover() {
    $('[data-toggle="popover"]').popover();
}

$(superCatch(fullscreen, get_last_refreshed, part_visited, setup_quantity_update, pdf_download, get_availability_updated, setup_refresh_stock, clicky_events, additional_fields, store_rfq, add_note, submit_rfq, save_last_part_id, togglePopover, setup_rfq_dialog));

