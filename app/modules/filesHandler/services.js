var module = angular.module('app.modules.filesHandler.services', ['ngResource']);

module.factory('filesHandlerService', ['$resource', '$http', 'authService', filesHandlerService]);

function filesHandlerService ($resource, $http, authService) {
	return {
		filesList: filesList,
		postFiles: postFiles,
		deleteFile: deleteFile/*,
		downloadFile: downloadFile*/
	};

	function filesList () {
		return $resource(remoteServer + 'users/' + authService.getUsername() + '/files', {}, {
			query: {
				method: 'GET',
				isArray: true,
				headers: {
					'token': authService.getToken()
				}
			}
		});
	};

	function postFiles (fd) {
		return $http.post(remoteServer + 'users/' + authService.getUsername() + '/files', fd, {
            transformRequest: angular.identity,
            headers: {
            	'Content-Type': undefined,
            	'token': authService.getToken()
            }
        });
	};

	function deleteFile (file) {
		return $http.delete(remoteServer + file.url, {
			headers: {
				'token': authService.getToken()
			}
		});
	};

	/*function downloadFile (file) {
		return $http.get(remoteServer + file.url, {
			headers: {
				'token': authService.getToken()
			}
		});
	};*/
};