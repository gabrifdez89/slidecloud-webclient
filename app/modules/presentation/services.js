var module = angular.module('app.modules.presentation.services', []);

module.factory('presentationService', ['$http', '$window', 'authService', presentationService]);

function presentationService ($http, $window, authService) {

	return {
		startPresentation: startPresentation,
		savePresentationLink: savePresentationLink,
		getPresentationLink: getPresentationLink
	};

	function startPresentation (file) {
		return $http.post(remoteServer + file.url + '/startpresentation', {}, {
			headers: {
				'token': authService.getToken()
			}
		});
	};

	function savePresentationLink (link) {
		$window.localStorage['link'] = link;
	};

	function getPresentationLink () {
		return $window.localStorage['link'];
	};
};