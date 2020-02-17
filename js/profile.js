// Knockout Models

var ko_profile, ko_address;
var save_redirect=false;
var Profile = function() {

    // Model Init
    var self = this;

    var local_profile = function() {
        var profile = {};
        if("profile" in localStorage) {
            try {
                profile = JSON.parse(localStorage.profile);
            }
            catch(e) {}
        }
        if(!profile.email_pref) profile.email_pref = {};
        if(!("iodparts" in profile.email_pref)) profile.email_pref.iodparts = true;
        if(!profile.addresses) profile.addresses = [];
        if(!("shipping_address" in profile)) profile.shipping_address = -1;
        if(!("billing_address" in profile)) profile.billing_address = -1;

        return profile;
    };

    self.init = function() {
        self.email_pref = {};
        self.email_pref.iodparts = ko.observable(true);
        self.addresses = ko.observableArray([]);
        self.shipping_address = ko.observable(-1);
        self.billing_address = ko.observable(-1);
        self.name = ko.observable(" ");
        self.email = ko.observable(" "); 
        self.company = ko.observable(" "); 
        self.phone = ko.observable(-1); 
    }

    self.init();

    self.reload = function() {
        var profile = local_profile();
        self.name(profile.name);
        self.email(profile.email);
        self.company(profile.company);
        self.phone(profile.phone);
        self.email_pref.iodparts(profile.email_pref.iodparts);
        self.addresses.removeAll();
        var i;
        for(i in profile.addresses) {
            self.addresses.push(profile.addresses[i]);
        }
        self.shipping_address(profile.shipping_address);
        self.billing_address(profile.billing_address);
    };

    self.reload();

    self.select_shipping = function() {
        if("index" in this) {
            self.shipping_address(this.index);
        }
    }

    self.add_address = function(new_address) {
        var i, max_index = -1;
        var addresses = self.addresses();
        for(i in addresses) {
            if(addresses[i].index > max_index) max_index = addresses[i].index;
        }
        new_address.index = max_index + 1;
        self.addresses.push(new_address);
        if(self.addresses().length == 1) {
            self.shipping_address(new_address.index);
            self.billing_address(new_address.index);
        }
    }

    self.delete_address = function(address, event) {
        event.preventDefault();
        if(confirm("Are you sure to delete this address?")) {
            if(self.shipping_address() == address.index) {
                self.shipping_address(-1);
            }
            if(self.billing_address() == address.index) {
                self.billing_address(-1);
            }
            self.addresses.remove(address);
        }
        return false;
    }

};

var Address = function() {
    var self = this;
    self.attention_to = ko.observable("");
    self.company = ko.observable("");
    self.address_line_1 = ko.observable("");
    self.address_line_2 = ko.observable("");
    self.city = ko.observable("");
    self.postal_code = ko.observable("");
    self.state = ko.observable("");
    self.country_code = ko.observable("");

    var profile = {};
    if("profile" in localStorage) {
        try {
            profile = JSON.parse(localStorage.profile);
        }
        catch(e) {}
    }
    if(profile.name) self.attention_to(profile.name);
    if(profile.company) self.company(profile.company);
};

var store_obj = function(key, obj) {
    localStorage[key] = ko.toJSON(obj);
}

var load_obj = function(key) {
    var obj = {};
    if(key in localStorage) {
        try {
            obj = JSON.parse(localStorage[key]);
        }
        catch(e) {}
    }
    return obj;
}

// Profile Specific Functions

function setup_auth() {
    if(!is_logged_in()) {
        goto_member_link(window.location.pathname);
    }
}

function load_profile() {
    var url = '/api/profile';
    var data = {};
    data.token = localStorage.u_token;
    $.getJSON(url, data)
    .done(function(response) {
        if(response && response.status) {
            if(response.status == 'success' && response.profile) {
                store_obj("profile", response.profile);
                ko_profile.reload();
                delete(localStorage.load_profile_flag);
                return;
            }
        }
        $('#status_text').html('Error loading profile!');
    })
    .fail(function(err) {
        $('#status_text').html('Error loading profile!');
    });
    return false;
}

function save_profile(e) {
    e && e.preventDefault();
    var url = '/api/profile';
    var data = {};
    data.profile = ko.toJS(ko_profile)
    data.token = localStorage.u_token;
    $.ajax({
        url: url, 
        data: JSON.stringify(data),
        method: 'post',
        contentType: 'application/json'
    })
    .done(function(response) {
        if(response && response.status) {
            if(response.status == 'success') {
                $('#status_text').html('Changes Saved!');
                delete(localStorage.save_profile_flag);
                if(save_redirect)
                {
                  window.location=save_redirect;  
                }
                localStorage.load_profile_flag=true;
                return;
            }
        }
        $('#status_text').html('Unexpected error updating profile!');
    })
    .fail(function(err) {
        $('#status_text').html('Unexpected error updating profile!');
    });
    return false;
}

function setup_ko_address() {

    if(!($('#ko-address-block').length)) {
        return;
    }

    var is_form_visible = false;
    ko_address = new Address();
    ko.applyBindings(ko_address, document.getElementById('ko-address-block'));
    $('.toggle_address_form').click(function() {
        if(is_form_visible) {
            $('#address_form').hide();
        }
        else {
            $('#address_form').show();
        }
        is_form_visible = !is_form_visible;
        return false;
    });
    $('#address_form').submit(function(e) {
        e.preventDefault();
        address = ko.toJS(ko_address);
        ko_profile.add_address(address);
        $('#address_form')[0].reset();
        $('#address_form').hide();
        save_profile();
        return false;
    });
}

function setup_ko_profile() {

    if(!($('#ko-profile-block').length)) {
        return;
    }

    ko_profile = new Profile();
    ko.applyBindings(ko_profile, document.getElementById('ko-profile-block'));

    $('.profile-save-button').click(save_profile);

}

function setup_country_select() {
    if(!($('.country-select').length)) {
        return;
    }
    var locale_country = "";
    if("inj_locale" in window && inj_locale.country) {
        locale_country = inj_locale.country;
    }
    var $country_select = $('.country-select');
    $.getJSON('/api/countries.json')
        .then(function(countries) {
            $country_select.empty();
            $country_select.append($("<option>", {
                text: "-- Select Country --",
                value: ""
            }));
            $(countries).each(function(i, country) {
                option_params = {
                    text: country.name,
                    value: country.code
                };
                if(country.code == locale_country) {
                    option_params.selected = true;
                }
                $country_select.append($("<option>" , option_params));
            });
        });
}

$(function() {

    setup_auth();
    setup_ko_profile();
    setup_ko_address();
    setup_country_select();

    if(localStorage.save_profile_flag) {
        save_profile();
    }
    else if(localStorage.load_profile_flag) {
        load_profile();
    }

});


