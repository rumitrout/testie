let map;

// let random_colors = [
//     'c7f0db', '8bbabb', '6c7b95', '464159', // https://colorhunt.co/palette/154144
//     'f9e090', 'ff935c', 'dc5353', 'a72461', // https://colorhunt.co/palette/152950
// ];

let country_colors = {};

let create_map = function() {
    map = new Datamap({
        scope: 'world',
        element: document.getElementById('container'),
        geographyConfig: {
            popupOnHover: false,
            highlightOnHover: false,
            borderWidth: 0.5
        },
        fills: {
            defaultFill: "#ccc",
            logistic: '#1111FF',
            supplier: '#FF1111'
        }
    });
}

const sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let centers = {
    'iodparts-technologies-pvt-ltd' : {
        'latitude': 19,
        'longitude': 75
    },
    'iodparts-technologies-inc' : {
        'latitude': 38.9108,
        'longitude': -79
    },
    'white-horse-laboratories-limited' : {
        'latitude': 21,
        'longitude': 113
    }
};

let center_names = {
    'iodparts-technologies-pvt-ltd': 'Pune',
    'iodparts-technologies-inc': 'USA',
    'white-horse-laboratories-limited': 'Hong Kong'
};

// let assign_colors = function() {
//     let i = 0;
//     for(country in countries) {
//         country_colors[country] = random_colors[i];
//         i++;
//         if(i >=  random_colors.length) {
//             i = 0;
//         }
//     }
// }

let high_count = 0;

let add_bubbles = function() {

    let bubbles = [];

    // Logistic Centers
    for(loc in centers) {
        let center = centers[loc];
        center['radius'] = 4;
        center['description'] = `Logistic Center: <strong>${center_names[loc]}</strong>`;
        center['fillKey'] = 'logistic';
        bubbles.push(center);
    }

    // Country Counts
    let country_counts = {};
    let country_bubbles = {};
    for(vpo of vpos) {
        country_counts[vpo['country']] = country_counts[vpo['country']] || 0;
        country_counts[vpo['country']]++;
        country_bubbles[vpo['country']] = { "latitude" : vpo['lat'],  "longitude": vpo['lng'] };
    }

    // Country Bubbles
    for(country in country_counts) {
        let bubble = country_bubbles[country];
        let country_name = countries[country];
        bubble['description'] = `${country_name} (${country_counts[country]} Purchases)`;
        bubble['radius'] = 4;
        bubble['fillKey'] = 'supplier';
        if(country_counts[country] > high_count) {
            high_count = country_counts[country];
        }
        bubbles.push(bubble);
    }

    // Add Bubbles
    map.bubbles(bubbles, {
        popupTemplate: function(geo, data) {
            return `<div class="hoverinfo">${data.description}</div>`;
        },
        borderWidth: 0
    });

};

let country_counts = {};

let update_stats = function(location) {
    let counts = { "total" : 0, "selected": 0 };
    country_counts = {};
    for(vpo of vpos) {
        counts['total']++;
        country_counts[vpo['country']] = country_counts[vpo['country']] || 0;
        if(vpo['shipping_entity'] != location) {
            continue;
        }
        country_counts[vpo['country']]++;
        counts['selected']++;
    }
    $('.counts-total').html(counts['total']);
    $('.counts-selected').html(counts['selected']);
    

    // Country Stats
    keysSorted = Object.keys(country_counts).sort(
        function(a,b){
            return country_counts[b] - country_counts[a];
        }
    );
    let stat_html = "";
    for(key of keysSorted) {
        stat_html += `${countries[key]}: <strong>${country_counts[key]}</strong> `;
    }

    // $('.counts-countries').html(JSON.stringify(country_counts));
    $('.counts-countries').html(stat_html);
}

let scaled_colors = [
    // '#f7fcf0',
    // '#e0f3db',
    // '#ccebc5',
    // '#a8ddb5',
    // '#7bccc4',
    // '#4eb3d3',
    // '#2b8cbe',
    // '#0868ac',
    // '#084081',

    '4EB3D2',
    '45ABCF',
    '3DA4CB',
    '369CC7',
    '2E95C3',
    '278DBF',
    '2086BB',
    '1A7EB7',
    '1377B3',
    '0D6FAF',
    '0767AC',
];

let assign_colors = function() {
    hue_size = scaled_colors.length;
    for(country in country_counts) {
        index = Math.ceil(hue_size * country_counts[country] / high_count) - 1;
        country_colors[country] = scaled_colors[index];
    }
}

let update_bubbles = function(location) {

    let bubbles = [];

    // Logistic Centers
    for(loc in centers) {
        let center = centers[loc];
        center['radius'] = 4;
        center['description'] = `Logistic Center: <strong>${center_names[loc]}</strong>`;
        center['fillKey'] = 'logistic';
        bubbles.push(center);
    }

    // Country Counts
    // let country_counts = {};
    let country_bubbles = {};
    for(vpo of vpos) {
        // country_counts[vpo['country']] = country_counts[vpo['country']] || 0;
        // country_counts[vpo['country']]++;
        country_bubbles[vpo['country']] = { "latitude" : vpo['lat'],  "longitude": vpo['lng'] };
    }

    // Country Bubbles
    for(country in country_counts) {
        let bubble = country_bubbles[country];
        let country_name = countries[country];
        bubble['description'] = `${country_name} (${country_counts[country]} Purchases)`;
        bubble['radius'] = 4;
        bubble['fillKey'] = 'supplier';
        if(country_counts[country] > high_count) {
            high_count = country_counts[country];
        }
        bubbles.push(bubble);
    }

    // Add Bubbles
    map.bubbles(bubbles, {
        popupTemplate: function(geo, data) {
            return `<div class="hoverinfo">${data.description}</div>`;
        },
        borderWidth: 0
    });

};

let draw_arcs = async function(location) {
    let arcs = [];
    for(vpo of vpos) {
        if(vpo['shipping_entity'] != location) {
            continue;
        }
        let origin = { "latitude" : vpo['lat'],  "longitude": vpo['lng'] };
        let destination = centers[vpo['shipping_entity']];
        // Randomise a little
        origin['latitude'] += Math.random() - 0.5;
        origin['longitude'] += Math.random() - 0.5;
        let strokeColor = country_colors[vpo['country']];
        arcs.push({ origin, destination, strokeColor });
    }
    map.arc(arcs);
}

let select_location = function(location, name) {
    update_stats(location);
    assign_colors();
    draw_arcs(location);
    update_bubbles(location);
    $('.filter-location').removeClass('selected');
    $(`.filter-location[data-location="${location}"]`).addClass('selected');
}

$(function() {
    create_map();
    // assign_colors();
    add_bubbles();
    $('.filter-location').on('click', function() {
        let location = $(this).attr('data-location');
        let name = $(this).text();
        select_location(location);
    });
    select_location('iodparts-technologies-inc');
});


