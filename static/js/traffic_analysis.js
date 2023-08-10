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

  //create overlays 
  let overlays = {
     "Collisions without Injury or Death": layers.NO_HARM_COLLISIONS,
     "Collisions with Injuries" : layers.INJURY_COLLISIONS,
     "Collisions with Fatalities" : layers.FATAL_COLLISIONS,
     "Collisions with Injuries & Fatalities"  : layers.DUAL_HARM_COLLISIONS
  };
 
 
  //Create layer control and add the layer control to the map
  L.control.layers(null,overlays, {
     collapsed: false
  }).addTo(map);
 

  //Create legend
  let collisionTotals = L.control({
    position : "bottomright"
    });

  //add html line connected to the legend
  collisionTotals.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    return div;
  };
  //Add the collision totals legend to the map
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
   
    //Establish counter for each collision
    let collisionCount = {
      INJURY_COLLISIONS: 0,
      FATAL_COLLISIONS: 0,
      NO_HARM_COLLISIONS: 0,
      DUAL_HARM_COLLISIONS: 0
    };
    
    
    //create a collisionType variable
    let collisionType = "";

    //loop through data and serperate into different types
    for (let i=0; i< cleanCollisions.length; i++) {
      let collision = cleanCollisions[i]      
      
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
    
    //Adding each collision type to its respective counter
    collisionCount[collisionType]++;
    
    
    //Creating a marker for each collision
    let collisionMarker = L.marker([collision['tb_latitude'], collision['tb_longitude']], {
      //connecting collision markers to their icons based on type
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
