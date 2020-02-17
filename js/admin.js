
// KO Models

var ko_part;

var Part = function(part) {
    var self = this;
    for(key in part) {
        self[key] = part[key];
    }
};

// KO Bindings

function setup_ko_part() {
    if("inj_part" in window) {
        ko_part = new Part(inj_part);
        spec_keys = {};
        if("inj_spec_keys" in window) {
            spec_keys = inj_spec_keys;
        }
        ko.applyBindings({
            part: ko_part,
            spec_keys: spec_keys,
        });
    }
}


// Part Edit Page - Save Button

function setup_part_edit() {
    $('.part-save-button').click(function() {
        $('#part_json_form textarea').val(ko.toJSON(ko_part));
        $('#part_json_form').submit();
    });
    $('.spec-remove-button').click(function() {
        var key = $(this).attr('data-spec-key');
        delete(ko_part.specs[key]);
        var $tr = $(this).parent('td').parent('tr');
        $tr.remove();
    });
    $('.spec-add-button').click(function() {
        var $tr = $(this).parent('td').parent('tr');
        var key = $tr.find('select').val();
        var val = $tr.find('input').val();
        ko_part.specs[key] = val;
        // ko_part.specs[key] = val;
        var data = [ { spec_key : key, part: ko_part } ];
        var $new_tr = $('<tr></tr>');
        $new_tr.insertBefore($tr);
        ko.applyBindingsToNode($new_tr.get(0), { template: { name: 'spec-template', foreach: data } });
        $tr.find('input').val("");
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

}


$(function() {
    if($('.part-edit-page').length) {
        setup_ko_part();
        setup_part_edit();
    }
    setup_autocomplete();
    
});

