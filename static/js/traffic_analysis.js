//function createMap(trafficCollisions) {
  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Initialize layergroups for collisions
  let layers = {
    NO_HARM_COLLISIONS :  new L.layerGroup(),
    INJURY_COLLISIONS: new L.layerGroup(),
    FATAL_COLLISIONS: new L.layerGroup(),
    DUAL_HARM_COLLISIONS: new L.layerGroup()
  };

  //create map with layers
  let map = L.map("map-id", {
    center: [37.75709, -122.43979],
    zoom: 12,
    layers: [
      layers.NO_HARM_COLLISIONS,
      layers.FATAL_COLLISIONS,
      layers.INJURY_COLLISIONS,
      layers.DUAL_HARM_COLLISIONS
    ]
  });

  // Add "streetmap" tile layer to map
  streetmap.addTo(map)

   // Create a baseMaps object to hold the streetmap layer.
   //let baseMaps = {
   //  "Street Map": streetmap
   //};
   
   let overlays = {
     "Collisions without Injury or Death": layers.NO_HARM_COLLISIONS,
     "Collisions with Injuries" : layers.INJURY_COLLISIONS,
     "Collisions with Fatalities" : layers.FATAL_COLLISIONS,
     "Collisions with Injuries & Fatalities"  : layers.DUAL_HARM_COLLISIONS
   };
 
   // create the mab object with options/
   //let map = L.map("map-id", {
    // center: [37.75709, -122.43979],
    // zoom: 12,
    //layers: [streetmap, trafficCollisions]// injuryCollisions, casualtyCollisions]
  // });
 
  //Create layer control and add the layer control to the map/
 
  L.control.layers(null,overlays, {
     collapsed: false
  }).addTo(map);
 

  //Create legend
  let collisionTotals = L.control({
    position : "bottomright"
    });

  collisionTotals.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    return div;
  };
  //Add the info legend to the map
  collisionTotals.addTo(map);

  //Initialize icon object for layer group

let icons = {
    NO_HARM_COLLISIONS: L.ExtraMarkers.icon({
      icon: 'ion-alert-circle-outline',
      iconColor: 'white',
      markerColor: 'green',
      shape: 'circle'
    }),
    INJURY_COLLISIONS: L.ExtraMarkers.icon({
      icon: 'ion-medkit-outline',
      iconColor: 'white',
      markerColor: 'orange',
      shape: 'square'
    }),
    FATAL_COLLISIONS: L.ExtraMarkers.icon({
      icon: 'skull-sharp',
      iconColor: 'white',
      markerColor: 'purple',
      shape: 'penta'
    }),
    DUAL_HARM_COLLISIONS: L.ExtraMarkers.icon({
      icon: 'thumbs-up-outline',
      iconColor: 'white',
      markerColor: 'red',
      shape: 'star'
    })
};

  // Perform an API call to the SFGOV API to get the crash information. Call createMarkers when it competes.
  d3.json("https://data.sfgov.org/resource/ubvf-ztfx.json").then(function(response){
    let cleanCollisions= []
    for (let  i = 0; i< response.length; i++) {
     let cleanCollision = response[i]
     if (cleanCollision.tb_latitude !== null 
      && cleanCollision.tb_latitude !== undefined 
      && cleanCollision.tb_longitude !== null
      && cleanCollision.tb_longitude !== undefined){
       cleanCollisions.push(cleanCollision);
      }
    };
   
    //let collision = cleanCollisions[i]
    //let location = [collision.tb_latitude,collision.tb_longitude]
    //let injuries = collision.number_injured;
    //let casualties = collision.number_killed; 

    let collisionCount = {
      INJURY_COLLISIONS: 0,
      FATAL_COLLISIONS: 0,
      NO_HARM_COLLISIONS: 0,
      DUAL_HARM_COLLISIONS:0
    };

    let collisionType = "";

    for (let i=0; i< cleanCollisions.length; i++) {
      let collision = cleanCollisions[i]
      //let location = [collision.tb_latitude,collision.tb_longitude]
      //let injuries = collision.number_injured;
      //let casualties = collision.number_killed; 
      //let crash = Object.assign({}, injuries[i], casualties[i]);
      
      
      if (collision.number_injured <=0 && collision.number_killed <=0){
        collisionType = "NO_HARM_COLLISIONS";
      }
      
      else if (collision.number_injured <= 0 && collision.number_killed > 0) {
        collisionType = "FATAL_COLLISIONS";
      }
      else if (collision.number_injured > 0 && collision.number_killed <= 0) {
        collisionType = "INJURY_COLLISIONS";
      }
      else if (collision.number_injured > 0 && collision.number_killed > 0) {
        collisionType = "DUAL_HARM_COLLISIONS"
      }
    collisionCount[collisionType]++;
    
    

    let collisionMarker = L.marker([collision['tb_latitude'], collision['tb_longitude']], {
      icon: icons[collisionType]
    });

    collisionMarker.addTo(layers[collisionType]);

    collisionMarker.bindPopup("Collision Type: " + collisionType + 
    "<br>" + "Injuries: " + collision.number_injured + 
    "<br>" + "Casualties: " + collision.number_killed);
  }

  updateLegend(collisionCount);
  });

  function updateLegend(collisionCount) {
    document.querySelector(".legend").innerHTML = [
      //"<p class = 'location'> Location: " + location + "</p>",
      "<p class = 'no_harm_collision'> No-Harm Collisions: " + collisionCount.NO_HARM_COLLISIONS + "</p>",
      "<p class = 'injury_collision'> Injury Collisions: " + collisionCount.INJURY_COLLISIONS + "</p>",
      "<p class = 'fatal_collision'> Fatal Collisions: " + collisionCount.FATAL_COLLISIONS + "</p>",
      "<p class = 'dual_harm_collision'> Dual-Harm Collisions: " + collisionCount.DUAL_HARM_COLLISIONS + "</p>" 
    ].join("");
  }



//Adding code for neighborhood data

//link for GEOjson data
let neighbourhood_json = "https://data.sfgov.org/api/geospatial/p5b7-5n3h?method=export&format=GeoJSON";

//api call for GEOjson data
d3.json(neighbourhood_json).then(function(hood_data) {
  //creating a Geojson layer with the neighbourhood data
  L.geoJson(hood_data).addTo(map)
});

//for (let i=0; i< hood_data.length; i++) {
//  let neighborhood = hood_data[i]
  
//}


 //function createMarkers(response) {
  // let collisions= []
  //   for (let  i = 0; i< response.length; i++) {
  //    let collision = response[i]
  //    if (collision.tb_latitude !== null && collision.tb_latitude !== undefined &&  collision.tb_longitude !== null && collision.tb_longitude !== undefined){
  //      collisions.push(collision);
  //    }
  //  }
  //   console.log(collisions.length)
    
    
  //  let collisionMarkers = [];
  //    for (let i = 0; i < collisions.length; i++) {

  //      let cleanCollision = collisions[i]

  //    let collisionMarker = L.marker([cleanCollision['tb_latitude'], cleanCollision['tb_longitude']])
        
  //      collisionMarkers.push(collisionMarker);
     
  //      } 
  //   createMap(L.layerGroup(collisionMarkers));
  //}
    
 // Perform an API call to the SFGOV API to get the crash information. Call createMarkers when it competes.
 // d3.json("https://data.sfgov.org/resource/ubvf-ztfx.json").then(createMarkers)