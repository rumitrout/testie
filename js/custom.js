function setup_search_widget() {
    $input = search_widget({
        activate_submit: true
    });
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
function set_username_homepage(){
    var name = sessionStorage.getItem("session_user_name");
    var el = null;
    if(name){
       
        $('#header').find('#user_name').html(name+'<i class="fa fa-caret-down"></i>');
    }
    else{
        el = $('#header').find('.header-dropdown').detach();
        $('#header').find('.top-menu').append('<li><a href="/login">Sign In</a></li>');
    }
}
function set_username(){
    var name = sessionStorage.getItem("session_user_name");
    var el = null;
    if(name){
        $('#page-nav-bar').find('.dropdown-toggle').html(name+' <i class="fa fa-caret-down"></i>');
    }
    else{
        el = $('.nav').find('.dropdown').detach();
        $('#page-nav-bar').append('<li><a href="/login">Sign In</a></li>');
    }
}


$(function() {
    setup_chat_icon();
    setup_search_widget();
    set_username_homepage();
    set_username();
    $('[data-toggle="popover"]').popover({       
        placement : 'bottom',
    });
    $('a.read-more').click(function(e) {
      e.preventDefault();
    });

});

