var module = angular.module('app.modules.filesHandler.services', ['ngResource']);

module.factory('filesHandlerService', ['$resource', '$http', 'authService', function ($resource, $http, authService) {
	return {
		filesList: $resource(remoteServer + 'users/' + authService.getUsername() + '/files', {}, {
			query: {
				method: 'GET',
				isArray: true,
				headers: {
					'token': authService.getToken()
				}
			}
		}),
		postFiles: function (fd) {
			return $http.post(remoteServer + 'users/' + authService.getUsername() + '/files', fd, {
                transformRequest: angular.identity,
                headers: {
                	'Content-Type': undefined,
                	'token': authService.getToken()
                }
            });
		},
		deleteFile: function (file) {
			return $http.delete(remoteServer + file.url, {
				headers: {
					'token': authService.getToken()
				}
			});
		},
		downloadFile: function (file) {
			return $http.get(remoteServer + file.url, {
				headers: {
					'token': authService.getToken()
				}
			});
		}
	};
}]);