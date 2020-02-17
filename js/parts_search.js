
function setup_search_widget() {
    $input = search_widget({
        on_response: function(query, response) {
            ko_parts.removeAll();
            $(response).each(function(i) {
                ko_parts.addPart(response[i]);
            });
            localStorage.search_response = JSON.stringify(response);
            localStorage.search_text = query;
        },
        on_select: function(item) {
            ko_parts.removeAll();
            ko_parts.addPart(item);
        }
    });

    if("req_search_text" in window && req_search_text != "") {
        localStorage.search_text = req_search_text;
        delete(localStorage.search_response);
    }

    if("search_text" in localStorage && localStorage.search_text != "") {
        $input.val(localStorage.search_text);
        if("search_response" in localStorage && localStorage.search_response != "") {
            response = JSON.parse(localStorage.search_response);
            $(response).each(function(i) {
                ko_parts.addPart(response[i]);
            });
        }
        else {
            $input.typeahead("lookup");
            setTimeout(function() {
                $input.typeahead("blur");
            }, 1550);
        }
    }

}

$(function() {
    setup_ko_parts();
    setup_search_widget();
    // setup_help_widget();
});

