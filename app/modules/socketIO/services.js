var module = angular.module('app.modules.socketIO.services', []);

module.factory('socketIOService', [socketIOService]);

function socketIOService () {

	var socket;

	return {
		connect: connect
	};

	function connect () {
		socket = io(remoteServer);
	};
};