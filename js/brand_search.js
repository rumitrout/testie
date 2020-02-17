
function setup_brand_search() {

    $input = $('#brand_search');
    var action = $input.attr('data-action');
    $input.typeahead({
        minLength: 2,
        autoSelect: false,
        source: function(query, process) {
            query_encoded =  encodeURIComponent(query.replace(/\//g, ""));
            query_encoded =  encodeURIComponent(query.replace(/\./g, " "));
            var api_search_url = '/api/brand/search/' + query_encoded + '.json';
            $.getJSON(api_search_url, function(response) {
                process(response);
            });
        },
        displayText: function(item) {
            var text = item.name;
            return text;
        },
        afterSelect: function(item) {
            if(action == 'submit_form') {
                $('#brand_search_selected_key').val(item.key);
                $input.parents('form:first').submit();
            }
            else if(action == 'field_update') {
                $('#brand_search_selected_key').val(item.key);
            }
            else {
                window.location =  '/brand/view/' + item.key;
            }
        }
    });

}

$(function() {
    setup_brand_search();
});
