// initialize the variables we need
// we do this here to make sure we can access them
// whenever we need to -- they have 'global scope'
var my_map; // this will hold the map
var my_map_options; // this will hold the options we'll use to create the map
var my_center = new google.maps.LatLng(34.395598, 132.454918); // center of map
var my_markers = []; // we use this in the main loop below to hold the markers
// this one is strange.  In google maps, there is usually only one
// infowindow object -- its content and position change when you click on a
// marker.  This is counterintuitive, but we need to live with it.
var infowindow = new google.maps.InfoWindow({content: ""});
var legendHTML = "<h1>Legend</h1>";

// I'm complicating things a bit with this next set of variables, which will help us
// to make multi-colored markers
var blueURL = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
var redURL = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
var greenURL = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
var hypocentre = {
    scale:4,
    strokeColor:"red",
    strokeWeight: 4,
    path:google.maps.SymbolPath.CIRCLE,

 }
var red_markers = [];
var blue_markers = [];

 var bombradius = new google.maps.Circle({
 strokeColor:'#ffe347',
 strokeOpacity: 0.8,
 strokeWeight: 1,
 fillColor:'#ffe347',
 fillOpacity: 0.3,
 map: my_map,
 center:{"lat":34.394720, "lng":132.454712},
 radius:500,
 window_content:"<p>total reach of the Atomic Bomb</p>"
});

google.maps.event.addListener(bombradius, 'click', function (evt) {
infowindow.setContent(this.window_content);
infowindow.setPosition(this.getCenter());
infowindow.open(my_map);
});
// this is for fun, if you want it.  With this powerful feature you can add arbitrary
// data layers to your map.  It's cool. Learn more at:
// https://developers.google.com/maps/documentation/javascript/datalayer#load_geojson
var myGeoJSON= {
  "type":"FeatureCollection",
  "features":
  [{"type":"Feature",
    "properties":{myColor: 'red'},
    "myColor" : "red",
    "geometry":{"type":"Polygon",
                "coordinates":[[[-85.60546875,49.03786794532644],[-96.6796875,40.713955826286046],
                                [-79.62890625,37.71859032558816],[-81.2109375,49.26780455063753],
                                [-85.60546875,49.03786794532644]]]}},
]};

/* a function that will run when the page loads.  It creates the map
 and the initial marker.  If you want to create more markers, do it here. */
function initializeMap() {
    my_map_options = {
        center:  my_center, // to change this value, change my_center above
        zoom: 15,  // higher is closer-up
        mapTypeId: google.maps.MapTypeId.STREETMAP // you can also use TERRAIN, STREETMAP, SATELLITE
    };

    // this one line creates the actual map
    my_map = new google.maps.Map(document.getElementById("map_canvas"),
                                 my_map_options);
    // this is an *array* that holds all the marker info
    var all_my_markers =
            [
              {position: new google.maps.LatLng(34.394822, 132.454782),
                map: my_map,
                icon: greenURL,
                title: "Shima Hospital",
                window_content:""


              },
              {position: new google.maps.LatLng(34.394205, 132.451853),
                map: my_map,
                icon: blueURL, // this sets the image that represents the marker in the map
                title: "Monument in memory of the Korean victims of the A-bomb",
                window_content:""
              },
              {position: new google.maps.LatLng(34.394720, 132.454712),
                map: my_map,
                icon: hypocentre, // this sets the image that represents the marker in the map
                title: "Hypocenter",
                window_content:""
},

              {position: new google.maps.LatLng(34.401510, 132.459605),
                map: my_map,
                icon: greenURL, // this sets the image that represents the marker in the map
                title: "Hiroshima Castle",
                window_content: '<h4>Hiroshima Castle</h4>'
              },

              {position: new google.maps.LatLng(34.391582, 132.456660),
                map: my_map,
                icon: redURL, // this sets the image that represents the marker in the map
                title: "Hiroshima Branch of Old Japan Bank",
                window_content: '<h4>Hiroshima Branch of Old Japan Bank</h4>'
              },

              {position: new google.maps.LatLng(34.393746, 132.453351),
                map: my_map,
                icon: greenURL, // this sets the image that represents the marker in the map
                title: "Rest House",
                window_content: '<h4>Rest House</h4>'
              },
              {position: new google.maps.LatLng(34.403215, 132.455464),
                map: my_map,
                icon: greenURL, // this sets the image that represents the marker in the map
                title: "Moto-machi",
                window_content: '<h4>Moto-machi</h4>'
              },
              {position: new google.maps.LatLng(34.395490, 132.453575),
                map: my_map,
                icon: redURL, // this sets the image that represents the marker in the map
                title: "Atomic Bomb Dome/Genbaku Dome",
                window_content: '<h4>Atomic Bomb Dome/Genbaku Dome/</h4>'
              },
              {position: new google.maps.LatLng(34.391506, 132.453146),
                map: my_map,
                icon: blueURL, // this sets the image that represents the marker in the map
                title: "Peace Memorial Museum",
                window_content: '<h4>Peace Memorial Museum</h4>'
              },
              {position: new google.maps.LatLng(34.397790, 132.47534),
                map: my_map,
                icon: redURL, // this sets the image that represents the marker in the map
                title: "Hiroshima Station",
                window_content: '<h4>Hiroshima Station</h4>'
              },
              {position: new google.maps.LatLng(34.390419, 132.456423),
                map: my_map,
                icon: greenURL, // this sets the image that represents the marker in the map
                title: "Shirakami-Sha Shrine",
                window_content: '<h4>Shirakami-Sha Shrine</h4>'
              },


            ];

        for (j = 0; j < all_my_markers.length; j++) {
        var marker =  new google.maps.Marker({
            position: all_my_markers[j].position,
            map: my_map,
            icon: all_my_markers[j].icon,
            title: all_my_markers[j].title,
            window_content: all_my_markers[j].window_content});

        // this next line is ugly, and you should change it to be prettier.
        // be careful not to introduce syntax errors though.
      legendHTML +=
        "<div class=\"pointer\" onclick=\"locateMarker(my_markers[" + j + "])\"> " +
          marker.window_content + "</div>";
        marker.info = new google.maps.InfoWindow({content: marker.window_content});
        var listener = google.maps.event.addListener(marker, 'click', function() {
            // if you want to allow multiple info windows, uncomment the next line
            // and comment out the two lines that follow it
            //this.info.open(this.map, this);
            infowindow.setContent (this.window_content);
            infowindow.open(my_map, this);
        });
        my_markers.push({marker:marker, listener:listener});
        if (all_my_markers[j].icon == blueURL ) {
            blue_markers.push({marker:marker, listener:listener});
        } else if (all_my_markers[j].icon == redURL ) {
            red_markers.push({marker:marker, listener:listener});
        }

    }
    document.getElementById("map_legend").innerHTML = legendHTML;
  my_map.data.addGeoJson(myGeoJSON);


  my_map.data.setStyle(function (feature) {
    var thisColor = feature.getProperty("myColor");
    return {
      fillColor: thisColor,
      strokeColor: thisColor,
      strokeWeight: 5
    };

});
}

// this hides all markers in the array
// passed to it, by attaching them to
// an empty object (instead of a real map)
function hideMarkers (marker_array) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(null);
    }
}
// by contrast, this attaches all the markers to
// a real map object, so they reappear
function showMarkers (marker_array, map) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(map);
    }
}

//global variable to track state of markers

var markersHidden = false;

function toggleMarkers (marker_array, map) {
  for (var j in marker_array) {
    if (markersHidden) {
      marker_array[j].marker.setMap(map);
    } else {
      marker_array[j].marker.setMap(null);
    }
  }
  markersHidden = !markersHidden;
}


// I added this for fun.  It allows you to trigger the infowindow
// from outside the map.
function locateMarker (marker) {
    console.log(marker);
    my_map.panTo(marker.marker.position);
    google.maps.event.trigger(marker.marker, 'click');
}
