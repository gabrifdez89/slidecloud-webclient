var module = angular.module('app.modules.socketIO.services', []);

module.factory('socketIOService', [socketIOService]);

function socketIOService () {

	var socket;

	return {
		createNamespace: createNamespace,
		connectToNamespace: connectToNamespace,
		goToPage: goToPage,
		onGoToPage: onGoToPage,
		onNamespaceCreated: onNamespaceCreated
	};

	function createNamespace (namespace) {
		socket = io(remoteServer);
		socket.emit('createNamespace', namespace);
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

	function onNamespaceCreated (callback) {
		socket.on('namespaceCreated', callback);
	}
};
