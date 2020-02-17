
function g2_search() {
    $input = $('input.g2-search');
    var action = $input.attr('data-action');
    var key_field = $input.attr('data-key-field');
    var value_field = $input.attr('data-value-field');
    if(!key_field) {
        key_field = 'id';
    }
    if(!value_field) {
        value_field = 'name';
    }
    var search_url = $input.attr('data-search-url');
    $input.typeahead({
        minLength: 2,
        autoSelect: false,
        source: function(query, process) {
            query_encoded =  encodeURIComponent(query.replace(/\//g, ""));
            query_encoded =  encodeURIComponent(query.replace(/\./g, " "));
            var api_search_url = search_url + query_encoded + '.json';
            $.getJSON(api_search_url, function(response) {
                process(response);
            });
        },
        displayText: function(item) {
            var text = item[value_field];
            return text;
        },
        afterSelect: function(item) {
            if(action == 'submit') {
                $('.g2-selected-key').val(item[key_field]);
                $input.closest('form').submit();
            }
            else if(action == 'redirect') {
                redirect_url = $input.attr('data-redirect-url') + "/" + item[key_field];
                window.location = redirect_url;
            }
        }
    });

}

$(function() {
    g2_search();
});
