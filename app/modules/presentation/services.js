var module = angular.module('app.modules.presentation.services', []);

module.factory('presentationService', ['$http', 'authService', presentationService]);

function presentationService ($http, authService) {

	return {
		startPresentation: startPresentation
	};

	function startPresentation (file) {
		return $http.post(remoteServer + file.url + '/startpresentation', {}, {
			headers: {
				'token': authService.getToken()
			}
		});
	};
};