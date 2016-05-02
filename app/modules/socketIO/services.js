var module = angular.module('app.modules.socketIO.services', []);

module.factory('socketIOService', [socketIOService]);

function socketIOService () {

	var socket;

	return {
		createNamespace: createNamespace,
		connectToNamespace: connectToNamespace,
		goToPage: goToPage,
		onGoToPage: onGoToPage
	};

	function createNamespace (namespace) {
		socket = io(remoteServer);
		socket.emit('createNamespace', namespace);
		connectToNamespace(namespace);
	};

	function connectToNamespace (namespace) {
		socket = io(remoteServer + namespace);
	};

	function goToPage (pageNum) {
		socket.emit('goToPage', pageNum);
	};

	function onGoToPage (callback) {
		socket.on('goToPage', callback);
	};
};
