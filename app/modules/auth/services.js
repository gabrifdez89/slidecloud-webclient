var module = angular.module('app.modules.auth.services', []);

module.factory('authService', ['$window', function ($window) {

	return {
		saveToken: saveToken,
		getToken: getToken,
		removeToken: removeToken,
		saveUsername: saveUsername,
		getUsername: getUsername,
		parseJwt: parseJwt,
		isAuthed: isAuthed
	};

	function saveToken (token) {
		$window.localStorage['jwtToken'] = token;
	};

	function getToken (token) {
		return $window.localStorage['jwtToken'];
	};

	function removeToken () {
		$window.localStorage.removeItem('jwtToken');
	};

	function saveUsername (username) {
		$window.localStorage['username'] = username;
	};

	function getUsername () {
		return $window.localStorage['username'];
	};

	function parseJwt (token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse($window.atob(base64));
	};

	function isAuthed () {
		var token = this.getToken();
		if(token) {
			return true;
		} else {
			return false;
		}
	};
}]);