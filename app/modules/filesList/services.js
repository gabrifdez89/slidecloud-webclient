var module = angular.module('app.modules.filesList.services', ['ngResource']);

module.factory('filesListService', ['$resource', function ($resource) {

	return $resource(remoteServer + 'users/pepe/files', {}, {
		query: {method: 'GET', isArray: true}
	});
	
}]);