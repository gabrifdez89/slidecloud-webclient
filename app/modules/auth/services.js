var module = angular.module('app.modules.auth.services', []);

module.factory('authService', ['$window', function ($window) {

	return {
		saveToken: function (token) {
			$window.localStorage['jwtToken'] = token;
		},
		getToken: function (token) {
			return $window.localStorage['jwtToken'];
		},
		removeToken: function () {
			$window.localStorage.removeItem('jwtToken');
		},
		saveUsername: function (username) {
			$window.localStorage['username'] = username;
		},
		getUsername: function () {
			return $window.localStorage['username'];
		},
		parseJwt: function (token) {
			var base64Url = token.split('.')[1];
			var base64 = base64Url.replace('-', '+').replace('_', '/');
			return JSON.parse($window.atob(base64));
		},
		isAuthed: function () {
			var token = this.getToken();
			if(token) {
				return true;
			} else {
				return false;
			}
		}
	};
}]);