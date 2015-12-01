var module = angular.module('app.modules.auth.services', []);

module.factory('authService', ['$window', function ($window) {

	return {
		saveToken: function (token) {
			$window.localStorage['jwtToken'] = token;
		},
		getToken: function (token) {
			return $window.localStorage['jwtToken'];
		},
		parseJwt: function (token) {
			var base64Url = token.split('.')[1];
			var base64 = base64Url.replace('-', '+').replace('_', '/');
			return JSON.parse($window.atob(base64));
		},
		isAuthed: function () {
			var token = this.getToken();
			if(token) {
				var params = this.parseJwt(token);
				//return Math.round(new Date().getTime() / 1000) <= params.exp;
				return params.username !== undefined;
			} else {
				return false;
			}
		}
	};
}]);