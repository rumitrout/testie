function setup_autocomplete() {

    $('.autocomplete').each(function(i, input) {

        $input = $(input);
        var api_search_prefix = $input.data('search-prefix');
        var api_search_suffix = $input.data('search-suffix');
        if(!api_search_prefix) return;

        var options = { minLength: 2 };
        var api_search_url = api_search_prefix + '%QUERY' + api_search_suffix;
        var engine = new Bloodhound({
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: api_search_url,
                wildcard: '%QUERY'
            }
        });
        var dataset = {
            name: "ajax",
            source: engine
        };
        $input.typeahead(options, dataset);
    });

}

$(function() {
    setup_autocomplete();
})


