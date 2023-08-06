function createMap(trafficCollisions) {
    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 });
 
   // Create a baseMaps object to hold the streetmap layer.
   let baseMaps = {
     "Street Map": streetmap
   };
   
   let overlayMaps = {
     "Traffic Collisions": trafficCollisions,
     "Collisions with Injuries" : injuryCollisions,
     "Collisions with Casualties" : casualtyCollisions
   };
 
   // create the mab object with options/
   let map = L.map("map-id", {
     center: [37.75709, -122.43979],
     zoom: 12,
     layers: [streetmap, injuryCollisions, casualtyCollisions]
   });
 
   //Create layer control and pass it baseMaps and overlayMap. add the layer control to the map/
 
     L.control.layers(baseMaps,overlayMaps, {
         collapsed: false
     }).addTo(map);
 }
 
 
 function createMarkers(response) {
 
     //removing blank collisions
 
 
 
     //function convert_to_float(a){
 
     //let floatValue = parseFloat(a);
 
     //return floatValue;
     //}
 
     //let lat = response.tb_latitude
     //let cleanLat= response.values(response)
     //let lon = cleanLat
   let collisions= []
     for (let  i = 0; i< response.length; i++) {
       let collision = response[i]
       if (collision.tb_latitude === null || collision.tb_latitude === undefined){
         delete collision;
       }
     }
 
     
     let collisionMarkers = [];
 
         for (let i = 0; i < response.length; i++) {
             //let cleanLat = response.getDataRange().getValues()
             //let cleanCollisions = cleanLat.tb_longitude.getValues()
             let cleanCollisions = []
             //let collision = cleanCollisions[i]
             let collision = response[i];  
             if (collision.tb_latitude !== null 
               && collision.tb_latitude !== undefined 
               && collision.tb_longitude !== null 
               && collision.tb_longitude !== undefined 
               ) 
               {
               //Object.keys(collision).forEach((item) => 
               //{collision.tb_latitude  == parseFloat(collision.tb_latitude) 
               //  && collision.tb_longitude == parseFloat(collision.tb_longitude)})
                 //parseFloat(collision.tb_latitude);
               //parseFloat(collision.tb_longitude);
               cleanCollisions.push(collision);
             
             }
             
             
             //console.log(cleanCollisions.length)
             
           //let collision = cleanCollisions[i];
            //console.log(cleanCollisions)
             
             //let mark = collision.get("point")
            // let location = mark.find( "coordinates")
             //let lat = location[0]
             //let lon = location[1] 
         
            // let lat = response.find(response[index].point.coordinates[1]);
             //let lon = response.find(response[index].point.coordinates[0]);
             //for (let i = 0; i <cleanCollisions.length; i++){
             //let lat = Number(cleanCollisions[i].tb_latitude)
                     //if (collision.tb_latitude.length > 4) {return lat}
             //let lon = Number(cleanCollisions[i].tb_longitude)
             //}
             //cleanCollisions = cleanCollisions.map(({tb_latitude, tb_longitude}) => ({tb_latitude : Number(tb_latitude), tb_longitude : Number(tb_longitude)}));
             
 
             let cleanCollision = cleanCollisions[i]
             //cleanCollisions = cleanCollisions.map(({tb_latitude, tb_longitude}) => ({tb_latitude : parseFloat(tb_latitude), tb_longitude : parseFloat(tb_longitude)}));
             //cleanCollision.tb_latitude = parseFloat(cleanCollision.tb_latitude.value());
             //cleanCollision.tb_longitude = parseFloat(cleanCollision.tb_longitude.value());
             //for (let i = 0; i <cleanCollisions.length; i++){
               
             //  cleanCollision.tb_latitude  = parseFloat(Object.values(tb_latitude))
              // cleanCollision.tb_longitude == parseFloat(cleanCollision.tb_longitude)}
             //Object.keys(cleanCollisions).forEach((cleanCollision) => 
             //{cleanCollision.tb_latitude  == parseFloat(cleanCollision.tb_latitude)
             //  && cleanCollision.tb_longitude == parseFloat(cleanCollision.tb_longitude)})
             
             //console.log(cleanCollisions.keys())
             let collisionMarker = L.marker([cleanCollision['tb_latitude'], cleanCollision['tb_longitude']])
 
             collisionMarkers.push(collisionMarker);
     }
 
     createMap.map(L.layerGroup(collisionMarkers));
 }
 
 // Perform an API call to the SFGOV API to get the crash information. Call createMarkers when it competes.
 d3.json("https://data.sfgov.org/resource/ubvf-ztfx.json").then(createMarkers)