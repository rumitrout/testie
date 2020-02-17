function setup_help_widget(options) {

    // 551616
    // E59341

    if(!("$zopim" in window)) {
        return;
    }

    if(!options) options = {};

    var default_options = {
    };

    var options = $.extend(default_options, options);

    if(!localStorage.help_widget_counter || localStorage.help_widget_counter < 5) {
        localStorage.help_widget_counter = localStorage.help_widget_counter || 0;
        setTimeout(function() {
            $('.help-widget').show();
        }, 6000);
    }
    else {
        setTimeout(function() {
            $('.help-widget').show();
        }, 15000);
    }
    localStorage.help_widget_counter++;

    $('.help-widget .hide-widget-link').click(function() {
        $('.help-widget').hide();        
    });

    $('.help-widget .show-chat-link').click(function() {
        $zopim.livechat.window.show();
    });


}

