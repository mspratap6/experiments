var net = require('net');
var Firebase = require('firebase');

/**
 * Constants.
 */
var PORT = 2500;
var ADDRESS = '10.0.1.38';

/***
 * Startup Function.
 */
(function(){	
	var self = this;

	self.server;
	self.gpsDataStore;	

	self.init = function(){
		self.gpsDataStoreRootAddr= 'https://cybotrack.firebaseio.com/gpsData/'

		self.server  = net.createServer();
		self.server.listen(PORT,ADDRESS);
		self.server.on('connection',function(sock){
			console.log("CONNECTED: remoteAddress: " + sock.remoteAddress + " port: " + sock.port);

			sock.on('data',function	(data){
				self.dataHandler(data,sock);
			})
		});
		server.on('error',function(error){
			console.log(error);
		})
		console.log('server listeing on '+ADDRESS +':' + PORT);		
	}

	self.init();

	/****
	 * Handel Data comming from GPS Devices.
	 */
	self.dataHandler = function(rData , sock){
		console.log('Recived: ' + rData);
		var jsonData = self.parseData(rData);	

		var dev = new Firebase(self.gpsDataStoreRootAddr + String(jsonData.deviceId));
		dev.set(jsonData);
	}

	self.parseData = function(gpsData){
		var arr = String(gpsData).split(",");

		var returnObject = {
			deviceId: arr[0]  || '',
			timeStamp: new Date().getTime(),
			date: arr[2] || '',
			time: arr[3] || '',
			lat: arr[4] || '',
			lng: arr[5] || '',
			gpsValid: arr[1] || '',
			speed: arr[6] || '',
			heading: arr[7] || '',
			networkSth: arr[8] || '',
			satCount: arr[9] || '',
			inputStatus: arr[10] || '',
			outputStatus: arr[11] || '',
			ang1: arr[12] || '',
			ang2: arr[13] || '',
			data14: arr[14] || ''
		};

		return returnObject;
	}

})();


