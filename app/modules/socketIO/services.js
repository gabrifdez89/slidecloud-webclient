var module = angular.module('app.modules.socketIO.services', []);

module.factory('socketIOService', [socketIOService]);

function socketIOService () {

	var socket;

	return {
		createNamespace: createNamespace,
		connectToNamespace: connectToNamespace,
		goToPage: goToPage,
		onGoToPage: onGoToPage,
		onNamespaceCreated: onNamespaceCreated,
		askCurrentPage: askCurrentPage
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
	};

	function askCurrentPage () {
		setTimeout(function () {
			socket.emit('whatIsCurrentPage');
		}, 2000); //Poor approach. We need to be sure the page is rendered before asking for current page
	};
};
