(function(){
	var app = angular.module('angularMaps',[]);

	app.controller('mapsController',function(){
			var vm = this;
			vm.mapOptions;
        	vm.map;
        	vm.devices = {};
        	vm.deviceMarkers = {};
        	var rootFireBase = "https://cybotrack.firebaseio.com/gpsData/";

			activate();
			function activate(){
				var fireBase = new Firebase(rootFireBase);

				fireBase.on("value",fireBaseDataReceived);
			}

			/**
			 * FIre Base Data Received.
			 */
			function fireBaseDataReceived(data){				
				data.forEach(function(devData){					
					var deviceData = devData.val();
					vm[deviceData.deviceId] = {
						lat: deviceData.lat,
						lng: deviceData.lng
					}

					var marker = vm.deviceMarkers[deviceData.deviceId];
					var devLatLng = new google.maps.LatLng(deviceData.lat,deviceData.lng);
					$('title').text('Lat: ' + deviceData.lat + ' lng: ' + deviceData.lng);
					$map.panTo(devLatLng);
					console.log( 'Lat: ' + deviceData.lat + ' lng: ' + deviceData.lng);
					if (!marker) {
						// Add marker
						//console.log('Adding Marker for Device ' + deviceData.deviceId);
						var m = new google.maps.Marker({
						 	position: devLatLng,
						 	map: $map,
						 	icon: 'https://google-maps-icons.googlecode.com/files/car.png',
						 	title: 'Device ' + deviceData.deviceId
						 });
						 vm.deviceMarkers[deviceData.deviceId] = m;
					}else{
						//console.log('updating Marker position for Device ' + deviceData.deviceId);
						marker.setPosition(devLatLng);
					};
				})
			}
	});




})();