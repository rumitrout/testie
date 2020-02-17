function get_set_device_number() {
    if(!("Cookies" in window)) {
        return false;
    }
    var device_number = Cookies.get('device_number');
    if(device_number && device_number != "") {
        return device_number;
    }
    var date = new Date();
    var ts = date.getTime().toString(36);
    var rn = Number(Math.floor(Math.random() * 1296)).toString(36);
    if(rn.length < 2) rn = "0" + rn;
    var device_number = ts + rn;
    Cookies.set('device_number', device_number, { expires : 3650, path: '/' });
    return device_number;
};

var is_below_fold_loaded = false;

function setup_search_widget() {
    $input = search_widget({
        activate_submit: true
    });
}

function below_fold() {
    if(!is_below_fold_loaded) {
        // Load Font Awesome CSS
        $("head").append('<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">');
        is_below_fold_loaded = true;
    }
}

function setup_chat_icon() {
    if(!("$zopim" in window)) {
        return;
    }
    $('.chat-icon').attr('href', '#');
    $('.chat-icon').click(function(e) {
        e.preventDefault();
        $zopim.livechat.window.show();
        return false;
    });
}

function sync_device_number() {
    if(!("Cookies" in window)) {
        return;
    }
    var device_number = get_set_device_number();
    if(!device_number || device_number == "") {
        return;
    }
    var synced_device_number = Cookies.get("synced_device_number");
    if(synced_device_number == device_number) {
        return;
    }
    var url = "/api/sync_device_number";
    $.ajax({
        url: url,
        method : "post",
        data : {
            device_number: device_number
        }
    })
    .done(function(response) {
        if(response && response.status) {
            if(response.status == 'success' && response["synced_device_number"]) {
                Cookies.set("synced_device_number", response["synced_device_number"], { expires : 7 });
            }
        }
    });
}
function set_username(){
    var name = sessionStorage.getItem("session_user_name");
    var el = null;
    if(name){
        $('#public-nav-bar').find('.dropdown-toggle').html(name+' <i class="fa fa-caret-down"></i>');
    }
    else{
        el = $('.nav').find('.dropdown').detach();
        $('#public-nav-bar').append('<li><a href="/login">Sign In</a></li>');
    }
}

superCatch = function superCatch() {
  for (var _len = arguments.length, fn = new Array(_len), _key = 0; _key < _len; _key++) {
    fn[_key] = arguments[_key];
  }

  for (var _i = 0, _fn = fn; _i < _fn.length; _i++) {
    item = _fn[_i];

    try {
      item();
    } catch (err) {}
  }
};

$(function() {
    $(window).one('mousemove', below_fold);
    setTimeout(below_fold, 100);
    setTimeout(setup_chat_icon, 100);
    setup_search_widget();
    $(window).one('mousemove', sync_device_number);
    set_username();
});


