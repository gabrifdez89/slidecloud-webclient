var module = angular.module('app.modules.presentation.services', []);

module.factory('presentationService', ['$http', presentationService]);

function presentationService ($http) {

	return {
		startPresentation: startPresentation
	};

	function startPresentation (file) {
		return $http.post(remoteServer + file.url + '/startpresentation', {
			headers: {
				'token': authService.getToken()
			}
		});
	};
};