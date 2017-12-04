// Google Map
let map;

// Markers for map
let markers = [];

// Info window
let info = new google.maps.InfoWindow();

// Execute when the DOM is fully loaded
$(document).ready(function() {

    // Styles for map
    // https://developers.google.com/maps/documentation/javascript/styling
    let styles = [

        // Hide Google's labels
        {
            featureType: "all",
            elementType: "labels",
            stylers: [
                {visibility: "off"}
            ]
        },

        // Hide roads
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {visibility: "off"}
            ]
        }

    ];

    // Options for map
    // https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    let options = {
        center: {lat: 0, lng: 0}, // Cambridge, Massachusetts
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        maxZoom: 14,
        minZoom: 2,
        panControl: true,
        styles: styles,
        zoom: 2,
        zoomControl: true,
        fullscreenControl: true
    };

    // Get DOM node in which map will be instantiated
    let canvas = $("#map-canvas").get(0);

    // Instantiate map
    map = new google.maps.Map(canvas, options);

    // Configure UI once Google Map is idle (i.e., loaded)
    google.maps.event.addListenerOnce(map, "idle", configure);

});


function initMap() {

    // define center
    //var uluru = {lat: -25.363, lng: 131.044};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2
        //center: uluru
    });

    // Configure UI once Google Map is idle (i.e., loaded)
    google.maps.event.addListenerOnce(map, "idle", configure);


    // Source: https://gist.github.com/parth1020/4481893
    // declare variables
    //var marker, i;

    // place marker for each location
    //for (i = 0; i < locations.length; i++) {
        //marker = new google.maps.Marker({
            //position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            //map: map
    //});

    // add listener for clicks
    //google.maps.event.addListener(marker, 'click', (function(marker, i) {
        //return function() {
            //infowindow.setContent(locations[i][0]);
            //infowindow.open(map, marker);
        //}
        //})(marker, i));
}

// Configure application
function configure()
{
    // Update UI after map has been dragged
    google.maps.event.addListener(map, "dragend", function() {

        // If info window isn't open
        // http://stackoverflow.com/a/12410385
        if (!info.getMap || !info.getMap())
        {
            update();
        }
    });

    // Update UI after zoom level changes
    google.maps.event.addListener(map, "zoom_changed", function() {
        update();
    });

    // Configure typeahead
    //$("#q").typeahead({
        //highlight: false,
        //minLength: 1
    //},
    //{
        //display: function(suggestion) { return null; },
        //limit: 10,
        //source: search,
        //templates: {
            //suggestion: Handlebars.compile(
                //"<div>" +
                //"{{city}}, {{country}}" +
                //"</div>"
            //)
        //}
    //};

    // Re-center map after place is selected from drop-down
    //$("#q").on("typeahead:selected", function(eventObject, suggestion, name) {

        // Set map's center
        //map.setCenter({lat: parseFloat(suggestion.latitude), lng: parseFloat(suggestion.longitude)});

        // Update UI
        //update();
    //});

    // Hide info window when text box has focus
    $("#q").focus(function(eventData) {
        info.close();
    });

    // Re-enable ctrl- and right-clicking (and thus Inspect Element) on Google Map
    // https://chrome.google.com/webstore/detail/allow-right-click/hompjdfbfmmmgflfjdlnkohcplmboaeo?hl=en
    document.addEventListener("contextmenu", function(event) {
        event.returnValue = true;
        event.stopPropagation && event.stopPropagation();
        event.cancelBubble && event.cancelBubble();
    }, true);

    // Update UI
    update();

    // Give focus to text box
    $("#q").focus();
}

// Update UI's markers
function update()
{
    // Get map's bounds
    let bounds = map.getBounds();
    let ne = bounds.getNorthEast();
    let sw = bounds.getSouthWest();

    // Get places within bounds (asynchronously)
    let parameters = {
        ne: `${ne.lat()},${ne.lng()}`,
        q: $("#q").val(),
        sw: `${sw.lat()},${sw.lng()}`
    };

    $.getJSON("/update", parameters, function(data, textStatus, jqXHR) {

        console.log(data);
        // Remove old markers from map
        removeMarkers();

        // add markers
        for (let i = 0; i < data.length; i++)
        {
           addMarker(data[i]);
        }
        });
}


// Search database for typeahead's suggestions
function search(query, syncResults, asyncResults)
{
    // Get places matching query (asynchronously)
    let parameters = {
        q: query
    };
    $.getJSON("/search", parameters, function(data, textStatus, jqXHR) {

        // Call typeahead's callback with search results (i.e., places)
        asyncResults(data);
    });
}


function addMarker(location)
{
    // store latitude and longitude in variable
    let LatLng = new google.maps.LatLng(location.lat, location.long);

    // instantiate marker
    let marker = new google.maps.Marker({
        position: LatLng,
        //label: location.city_name,
        map: map,
        //source: https://stackoverflow.com/questions/40490129/set-label-size-in-google-maps-api
        label: {
            text: location.city_name,
            color: 'black',
            fontSize: "12px"
        },
        icon: {
            labelOrigin: new google.maps.Point(7, 40),
            // source: https://stackoverflow.com/questions/8248077/google-maps-v3-standard-icon-shadow-names-equiv-of-g-default-icon-in-v2
            url: 'http://maps.google.com/mapfiles/marker.png'
        }
    });

    // add newly created marker to the array stored in global variable markers
    markers.push(marker);

    // listen for clicks on marker
    google.maps.event.addListener(marker, 'click', function() {
        // get articles for place
        //let parameters = {
            //geo: place.postal_code
        //};

        // source: https://www.thesitewizard.com/html-tutorial/open-links-in-new-window-or-tab.shtml
        let content = "<h4>" + location.event_name + "</h4>" + "<h5>" + "Number of Deaths: " + location.deaths + "</h5>" + "<p>" + location.description + "</p>" + '<a href="'+ location.link + '" target="_blank">' + "More Information" + "</a>";

        // show marker info
        showInfo(marker, content);
    });
}
        //});


    //});



// Show info window at marker with content
function showInfo(marker, content)
{
    // Start div
    let div = "<div id='info'>";
    if (typeof(content) == "undefined")
    {
        // http://www.ajaxload.info/
        div += "<img alt='loading' src='/static/ajax-loader.gif'/>";
    }
    else
    {
        div += content;
    }

    // End div
    div += "</div>";

    // Set info window's content
    info.setContent(div);

    // Open info window (if not already open)
    info.open(map, marker);
}

// Remove markers from map
function removeMarkers()
{
    // remove all markers from the map and delete them
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
}