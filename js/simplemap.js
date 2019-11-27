/* Stylesheet by Andrew Wiseman, 2018 */

var map = L.map('map',{
  center: [37.0902,-95.7129],
  zoom: 4,
  minZoom: 2,
  maxZoom: 18
});

// basemap

$(document).ready(function() {
    $("#dialog").dialog({
		maxWidth:500,
		maxHeight: 300,
		width: 500,
		height: 300
	});
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWF3aXNlbWFuIiwiYSI6ImNpc2wxcTdtajA3Mjkyem53b211bzJha3MifQ.DNfN9N3PXgw-Fgq6fs-_3g'
}).addTo(map);

// add local geojson

var simpleLayer

// loading GeoJSON file - Here my html and usa_adm.geojson file resides in same folder
$.getJSON("/data/data.geojson",function(simpledata){
// L.geoJson function is used to parse geojson file and load on to map
	//simpleLayer = L.geoJson(simpledata).addTo(map);
	simpleLayer = L.geoJSON(simpledata, {
		pointToLayer: function(feature, latlng) {
			//var icon:
			// restaurant fast_food cafe bar nightclub ice_cream
			if (feature.properties.tags.shop === 'massage' || feature.properties.tags.shop === 'hairdresser' || feature.properties.tags.shop === 'rug_cleaning' || feature.properties.tags.shop === 'nail_salon' || feature.properties.tags.shop === 'beauty' || feature.properties.tags.shop === 'laundry' || feature.properties.tags.shop === 'frame' || feature.properties.tags.shop === 'dry_cleaning') {
				var icon = servIcon;
			} else if (feature.properties.tags.shop === 'convenience_store' || feature.properties.tags.shop === 'convenience') {
				var icon = convIcon;				
			} else if (feature.properties.tags.amenity === 'fast_food' || feature.properties.tags.amenity === 'restaurant' || feature.properties.tags.amenity === 'ice_cream') {
				var icon = dineIcon;
			} else if (feature.properties.tags.amenity === 'cafe') {
				var icon = cafeIcon;
			} else if (feature.properties.tags.amenity === 'fire_station' ) {
				var icon = fireIcon;	
			} else if (feature.properties.tags.amenity === 'dentist' ) {
				var icon = dentalIcon;	
			} else if (feature.properties.tags.amenity === 'doctors' || feature.properties.tags.amenity === 'veterinary' || feature.properties.tags.amenity === 'alternative_medicine' || feature.properties.tags.amenity === 'doctor' || feature.properties.tags.amenity === 'clinic') {
				var icon = medicalIcon;
			} else if (feature.properties.tags.amenity === 'pharmacy' ) {
				var icon = pharmIcon;
			} else if (feature.properties.tags.amenity === 'bar' || feature.properties.tags.amenity === 'pub' || feature.properties.tags.amenity === 'nightclub') {
				var icon = barIcon;								
			} else if (feature.properties.tags.amenity === 'school' || feature.properties.tags.amenity === 'prep_school' ) {
				var icon = schoolIcon;	
			} else if (feature.properties.tags.amenity === 'place_of_worship' || feature.properties.tags.amenity === 'sdfsdf' ) {
				var icon = churchIcon;	
			} else if (feature.properties.tags.amenity === 'social_facility' || feature.properties.tags.amenity === 'post_office' ) {
				var icon = helpIcon;	
			} else if (feature.properties.tags.shop === 'car_repair' || feature.properties.tags.amenity === 'car_rental' || feature.properties.tags.shop === 'car_detail' || feature.properties.tags.shop === 'auto_parts' || feature.properties.tags.amenity === 'charging_station' ) {
				var icon = carIcon;			
			} else if (feature.properties.tags.amenity === 'fuel' || feature.properties.tags.shop === 'sdfsf' ) {
				var icon = gasIcon;	
			} else {
				var icon = sizeIcon;
			}

			var layer = L.marker(latlng, {icon: icon});

			return layer;
			//$('#activity_pane').showLoading();
		},
		onEachFeature: onEachFeature
	});
	simpleLayer.addTo(map);
	map.fitBounds(simpleLayer.getBounds());
});



function onEachFeature(feature, layer) {
	//var housenumber = "feature.properties.tags.addr:housenumber"
	//var street = "feature.properties.tags.addr:street"
	//obj.x == obj['x']
    // does this feature have a property named popupContent?
	if (feature.properties.tags['addr:housenumber'] && feature.properties.tags['addr:street']){
		var address = feature.properties.tags['addr:housenumber']+' '+feature.properties.tags['addr:street'];
	} else {
	var address = ''
	};
    if (feature.properties && feature.properties.tags.name) {
		if (feature.properties.tags.shop) {
			layer.bindPopup('Name: '+feature.properties.tags.name+'<br>Shop: '+feature.properties.tags.shop+'<br>'+address);
		}
		else if (feature.properties.tags.amenity) {
			layer.bindPopup('Name: '+feature.properties.tags.name+'<br>Amenity: '+feature.properties.tags.amenity+'<br>'+address);
		}	
    }
	else if (feature.properties) {
				if (feature.properties.tags.shop) {
			layer.bindPopup('Unnamed '+feature.properties.tags.shop+'<br>'+address);
		}
		else if (feature.properties.tags.amenity) {
			layer.bindPopup('Unnamed '+feature.properties.tags.amenity+'<br>'+address);
		}	
	}
		
}

////////////////
// all the icons
////////////////

var borderIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [19, 31],
  iconAnchor: [12, 31],
  popupAnchor: [1, -34],
  shadowSize: [31, 31]
});

var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


var shopIcon = new L.Icon({
  iconUrl: '/images/004-cart-1.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [35, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var dollarIcon = new L.Icon({
  iconUrl: '/images/049-dollar.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [35, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

 // Creates a red marker with the coffee icon
  var testMarker = L.AwesomeMarkers.icon({
    icon: 'coffee',
	prefix: 'fa',
    markerColor: 'blue'
  });
  
 // dining
  var dineIcon = L.AwesomeMarkers.icon({
    icon: 'utensils',
	prefix: 'fa',
    markerColor: 'blue'
  });  
  
 // dental
  var dentalIcon = L.AwesomeMarkers.icon({
    icon: 'tooth',
	prefix: 'fa',
    markerColor: 'red'
  });

 // pharm
  var pharmIcon = L.AwesomeMarkers.icon({
    icon: 'prescription-bottle-alt',
	prefix: 'fa',
    markerColor: 'red'
  });    

 // doctor
  var medicalIcon = L.AwesomeMarkers.icon({
    icon: 'user-md',
	prefix: 'fa',
    markerColor: 'red'
  });      
  
 // cafe
  var cafeIcon = L.AwesomeMarkers.icon({
    icon: 'coffee',
	prefix: 'fa',
    markerColor: 'blue'
  });    
  
 // gas
  var gasIcon = L.AwesomeMarkers.icon({
    icon: 'gas-pump',
	prefix: 'fa',
    markerColor: 'green'
  }); 

 // car
  var carIcon = L.AwesomeMarkers.icon({
    icon: 'car-alt',
	prefix: 'fa',
    markerColor: 'green'
  });   
  
 // service
  var servIcon = L.AwesomeMarkers.icon({
    icon: 'cash-register',
	prefix: 'fa',
    markerColor: 'green'
  });
  
// misc
  var convIcon = L.AwesomeMarkers.icon({
    icon: 'shopping-basket',
	prefix: 'fa',
    markerColor: 'green'
  });   
  
  // misc
  var miscIcon = L.AwesomeMarkers.icon({
    icon: 'dollar-sign',
	prefix: 'fa',
    markerColor: 'green'
  });  
  
  var schoolIcon = L.AwesomeMarkers.icon({
    icon: 'graduation-cap',
	prefix: 'fa',
    markerColor: 'orange'
  });  
  
  var churchIcon = L.AwesomeMarkers.icon({
    icon: 'place-of-worship',
	prefix: 'fa',
    markerColor: 'pink'
  });   
  
  var helpIcon = L.AwesomeMarkers.icon({
    icon: 'hands-helping',
	prefix: 'fa',
    markerColor: 'pink'
  });  

  var fireIcon = L.AwesomeMarkers.icon({
    icon: 'fire-alt',
	prefix: 'fa',
    markerColor: 'pink'
  });  
  
  var barIcon = L.AwesomeMarkers.icon({
    icon: 'glass-martini-alt',
	prefix: 'fa',
    markerColor: 'blue'
  });  
  
  // half size
  var sizeIcon = L.AwesomeMarkers.icon({
    icon: 'dollar-sign',
	prefix: 'fa',
    markerColor: 'green',
	extraClasses: 'fa-3x'
  });  
  

  // tester for size
 var divsizeIcon = L.divIcon({
    html: '<i class="fa fa-truck" style="color: red"></i>',
    iconSize: [20, 20],
    className: 'myDivIcon'
  });


////////////////////////////////////////////
