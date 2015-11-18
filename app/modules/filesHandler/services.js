var module = angular.module('app.modules.filesHandler.services', ['ngResource']);

module.factory('filesHandlerService', ['$resource', '$http', function ($resource, $http) {
	return {
		filesList: $resource(remoteServer + 'users/pepe/files', {}, {
			query: {method: 'GET', isArray: true}
		}),
		postFiles: function (fd) {
			return $http.post(remoteServer + 'users/pepe/files', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
		},
		deleteFile: function (file) {
			return $http.delete(remoteServer + file.url);
		}
	};
}]);