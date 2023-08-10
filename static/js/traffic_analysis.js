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
    
    //create empty array for cleaned data
    let cleanCollisions= []
    
    //looping through api response
    for (let  i = 0; i< response.length; i++) {
      
      //create a variable for each dictionary in the array
      let cleanCollision = response[i]
      
      //exclude dictionaries with undefined and null lat and lon cells
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

    //loop through data and serperate into different types based on injury and fatatlity counts
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

    
    //adding the markers to their layers
    collisionMarker.addTo(layers[collisionType]);

    //adding pop up window for each marker with collsion type, injury count, and fatality count
    collisionMarker.bindPopup("Collision Type: " + collisionType + 
    "<br>" + "Injuries: " + collision.number_injured + 
    "<br>" + "Casualties: " + collision.number_killed);
  }

    //adding the collision count to the legend
    updateLegend(collisionCount);
    });

    //updating the legend to reflect the counts of each collision type and tying each count to html
    function updateLegend(collisionCount) {
      document.querySelector(".legend").innerHTML = [
        "<p class = 'no_harm_collision'> No-Harm Collisions: " + collisionCount.NO_HARM_COLLISIONS + "</p>",
        "<p class = 'injury_collision'> Injury Collisions: " + collisionCount.INJURY_COLLISIONS + "</p>",
        "<p class = 'fatal_collision'> Fatal Collisions: " + collisionCount.FATAL_COLLISIONS + "</p>",
        "<p class = 'dual_harm_collision'> Dual-Harm Collisions: " + collisionCount.DUAL_HARM_COLLISIONS + "</p>" 
      ].join("");
    }
