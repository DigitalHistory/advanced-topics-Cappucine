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
var legendHTML = "<h3>Legend</h3>";

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
                title: "<img class='mapimg' src=\" https://media-cdn.sygictraveldata.com/media/800x600/612664395a40232133447d33247d383435303138363934\"/>",
                window_content:"<h4>Shima Hospital</h4><p>   Originally built in 1933, <a href='http://www.pcf.city.hiroshima.jp/virtual/VirtualMuseum_e/tour_e/ireihi/tour_43_e.html'>Shima Hopsital</a> was later rebuilt in 1948 by Dr. Shima after being completely destroyed as the first contact of the bomb. It now has a memorial plaque and is dedicated to peace and caring for the underprivileged. </p>"

              },

              {position: new google.maps.LatLng(34.395952, 132.450634),
                map: my_map,
                icon: greenURL,
                title: "<img class= 'mapimg' src='https://www.hiroshima-navi.or.jp/en/post/assets_c/2017/05/honkawa001-thumb-1060xauto-5808.jpg'/>",
                window_content:  " <h4>Honkawa Elementary School</h4><p>  <a href='http://www.pcf.city.hiroshima.jp/virtual/VirtualMuseum_e/exhibit_e/exh0807_e/exh080703_e.html'>Honkawa Elementary School</a> was another more soundly structured building, constructed in 1928. It was quickly rebuilt in 1946 and used for the same purpose as a school, as well as some of it being used as a peace museum. This is similar to Fukuromachi Elementary school which had the same story.</p> "
},
              {position: new google.maps.LatLng(34.394205, 132.451853),
                map: my_map,
                icon: blueURL, // this sets the image that represents the marker in the map
                title: "<img  class='mapimg' src=\"http://www.pcf.city.hiroshima.jp/virtual/img/irei_img/tour_11.jpg\"/> ",
                window_content:" <h4> Monument in memory of the Korean victims of the A-bomb </h4><p>   Completed in 1970, the <a href='http://www.pcf.city.hiroshima.jp/virtual/VirtualMuseum_e/tour_e/ireihi/tour_11_e.html'>Monument in memory of the Korean victims of the A-bomb</a>'  acknowledges the role Japan played in forced and coerced conscription and labour during the war, and those who died in Hiroshima from the bomb. Originally in another location, it was moved in 1999 to the Peace Memorial Park.  </p>"
              },
              {position: new google.maps.LatLng(34.394720, 132.454712),
                map: my_map,
                icon: hypocentre, // this sets the image that represents the marker in the map
                title: " ",
                window_content:" <h4><a href='  http://www.atomicarchive.com/Docs/MED/med_chp3.shtml'  >Hypocenter</a></h4><p> 4.4 square miles outward from the hypocentre was an enormous firestorm destroying buildings and instantly killing almost everyone in its reaches </p>"
},
              {position: new google.maps.LatLng(34.401510, 132.459605),
                map: my_map,
                icon: greenURL, // this sets the image that represents the marker in the map
                title: "<img class='mapimg' src= 'http://jcastle.info/smw/images/8/8c/Hiroshima13.jpg' />",
                window_content:
"<h4>Hiroshima Castle</h4> <a href=' http://visithiroshima.net/things_to_do/attractions/historical_places/hiroshima_castle.html ' >Hiroshima castle</a> was historically the living quarters for noble families/warlords. After its destruction it was restored externally in 1958, and internally in 1989 as well as transformed into a museum informing on the historical military commanders. "
              },
              {position: new google.maps.LatLng(34.391582, 132.456660),
                map: my_map,
                icon: redURL, // this sets the image that represents the marker in the map
                title: " <img class='mapimg' src='https://www.hiroshima-navi.or.jp/en/post/assets_c/2017/05/ginko001-thumb-1060xauto-5810.jpg'/>",
                window_content: " <h4>Hiroshima Branch of Old Japan Bank </h4><a href = 'http://gethiroshima.com/museums-attractions/the-former-bank-of-japan-hiroshima-branch-building-kyu-nichi-gin/ ' >The Hiroshima Branch of old Japan</a> built in 1936 originally, was more durable than most buildings in Hiroshima, and therefore sustained its original structure. It continued as a bank until 1992, and in 2000 it was transformed into a cultural and art exhibition space. Alongside Hiroshima Castle, this building is an example of a repurposed building. Though it withstood as a bank, possibly inheriting connotations of the strength (not only physically) of the national economic system, the meaning was transformed in 2000 in order to serve as a cultural building. "
              },
              {position: new google.maps.LatLng(34.393746, 132.453351),
                map: my_map,
                icon: greenURL, // this sets the image that represents the marker in the map
                title: "<img class='mapimg' src='http://www.pcf.city.hiroshima.jp/virtual/img/irei_img/tour_17.jpg'/>",
                window_content: "<h4> Rest House </h4><a href =' http://www.pcf.city.hiroshima.jp/virtual/VirtualMuseum_e/tour_e/ireihi/tour_17_e.html'>The Rest House</a> is a building that was rebuilt after the bomb. It had not taken large damage due to its concrete and fire-proof construction, but everything inside was destroyed and there was only 1 survivor who was in the basement. Previously it had been a Kimono shop since 1929 and in 1943 was sold to the Fuel Rationing Union.  Today it is an information center for the Memorial Park. "
              },

              {position: new google.maps.LatLng(34.403215, 132.455464),
                map: my_map,
                icon: greenURL, // this sets the image that represents the marker in the map
                title: " <img class='mapimg' src='http://marketmonitor.com.ph/wp-content/uploads/2016/05/Hiroshima-Photo.jpg'/>",
  window_content: " <h4>Moto-machi </h4> <a href ='http://www.pcf.city.hiroshima.jp/virtual/VirtualMuseum_e/exhibit_e/exh1207_e/exh120700_e.html'>Moto-machi</a> is a reconstructed neighbourhood that was previously known as the centre of military operations in Hiroshima, and as the outer lands to Hiroshima Castle. It was also a very recreational neighbourhood for residents, hosting festivals and exhibitions and attracting people from across the country. Most of Moto-machi was destroyed from the bomb but soon after the city was rebuilt completely in 1978 with schools, hospitals, houses, government offices, and a park, reflecting the city’s intentions of quickly rebuilding and re-envisioning Hiroshima. "
              },
     {position: new google.maps.LatLng(34.395490, 132.453575),
                map: my_map,
                icon: redURL, // this sets the image that represents the marker in the map
                title: "<img class='mapimg' src='http://worldalldetails.com/article_image/1301575026-bn7em3aj.jpg'/>",
                window_content: " <h4>Atomic Bomb Dome/Genbaku Dome  </h4> <a href='http://visithiroshima.net/things_to_do/attractions/historical_places/a-bomb_dome.html http://aboutjapan.japansociety.org/hiroshima_peace_dome#sthash.DreTqwFl.dpbs'>The Atomic Bomb Dome</a> is arguably one of the most famous buildings representing the atomic bomb solely because of its untouched structure leaving viewers to be face-to-face with the destructive event. In the mid-1960’s city officials decided to preserve it, and in 1996 it became a Unesco world heritage site. "
              },

              {position: new google.maps.LatLng(34.391506, 132.453146),
                map: my_map,
                icon: blueURL, // this sets the image that represents the marker in the map
                title: "<img class='mapimg' src='https://cdn.cnn.com/cnnnext/dam/assets/140531202620-2-hiroshima-peace-memorial-horizontal-large-gallery.jpg'/> ",
window_content: " <h4> Peace Memorial Museum</h4>The Peace Memorial Museum opened in 1955 as a collection of artefacts from the bombing, visited mostly by residents in Hiroshima who had memories of August 6, 1945.[19]  In subsequent remodelling, the museum made changes to content and display, with the main goal being to promote peace by displaying artefacts representing the effects of the bomb.[20] The decisions pertaining to what to include and exclude in the museum were not unanimous, similar to the difficulty around the A-bomb Dome. In the 80s, Japan had been pressured to acknowledge the atrocities and aggression that they had committed during the war.[21] By the 90s, the museum had encompassed a large history of events contextualizing the bomb and war itself.  "

              },
              {position: new google.maps.LatLng(34.397790, 132.47534),map: my_map,
                icon: redURL, // this sets the image that represents the marker in the map
                title: "<img class='mapimg' src='https://www.gojapango.com/wp-content/uploads/2016/07/normal_IMG_1265.JPG'/>",
                window_content: " <h4> Hiroshima Station </h4> <a href =' http://www.pcf.city.hiroshima.jp/virtual/VirtualMuseum_e/visit_e/vit_ex_e/vit_ex7_e/7d_e.html ' >Hiroshima station</a> was built in 1922. It took little damage from the bomb, as it was further away from the hypo-centre, however, those inside the station were not spared. "
              },
       {position: new google.maps.LatLng(34.390419, 132.456423),
                map: my_map,
                icon: greenURL, // this sets the image that represents the marker in the map
                window_content: "<h4>Shirakami-Sha Shrine</h4><p>Shrines were common in Hiroshima as a previous castle-town where successive lords would build shrines of their own, and as an urban centre home to many Shinto and Buddhist practitioners. Since they were made from wood materials, most of the temples burned down, however, in efforts to redevelop the city, most have been rebuilt and still stand among the modern concrete buildings. <a href='  https://en.japantravel.com/hiroshima/shirakami-sha-shrine/3125' >Shirakami-Sha-Shrine</a> was rebuilt in 1955 as a smaller version of what it had been before the bomb There is little information on it prior to its reconstruction despite the important role of Shrines. </p>",
                title: "<img class='mapimg' src='https://media-cdn.tripadvisor.com/media/photo-s/10/d2/af/c2/caption.jpg'/> "

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
          marker.title + "</div>";
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
