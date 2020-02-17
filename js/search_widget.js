function search_widget(options) {

    if(!options) options = {};

    var default_options = {
        on_response : function() {},
        on_select: false,
        selector: '#parts_search_box',
        button_selector: '#search_button',
        activate_submit: false,
    };

    var options = $.extend(default_options, options);

    var $input = $(options.selector);

    $input.typeahead({
        minLength: 2,
        autoSelect: false,
        source: function(query, process) {
            query2 =  encodeURIComponent(query.replace(/\//g, "").replace(/\./g, ""));
            $input.data("last_response", "");
            $.getJSON('/api/parts/search/' + query2 + '.json', function(response) {
                options.on_response(query, response);
                $input.data("last_response", response);
                process(response);
            });
        },
        displayText: function(item) {
            if("is_selected" in item) {
                return item.name;
            }
            var text = item.name;
            if(item.brand_name) text += ' (' + item.brand_name + ')';
            return text;
        },
        afterSelect: function(item) {
            if(options.on_select && typeof options.on_select == 'function') {
                options['on_select'](item);
                return;
            }
            localStorage.search_text = item.name;
            window.location =  item.url;
        },
        updater: function(item) {
            item.is_selected = true;
            return item;
        },
        matcher: function(item) {
            return true;
        },
    });

    if(options.activate_submit) {
        var on_submit = function() {
            var search_text = $input.val();
            localStorage.search_text = search_text;
            if($input.data('last_response')) {
                var last_response = $input.data('last_response');
                if(last_response.length == 1) {
                    item = last_response[0];
                    localStorage.search_text = item.name;
                    window.location = item.url;
                    return;
                }
                localStorage.search_response = JSON.stringify(last_response);
            }
            else {
                delete(localStorage.search_response);
            }
            var search_text = search_text.replace(/[^a-zA-Z0-9]/g, '-');
            window.location = '/parts/search/'+ search_text;
            return false;
        };

        $input.on('keydown', function(e) {
            if(e.keyCode == 13) {
                // wait for afterSelect event
                // if it is not fired, trigger, on_submit
                setTimeout(on_submit, 50);
            }
        });

        $(options.button_selector).click(on_submit);

    }

    return $input;

}

window.search_widget = search_widget;

