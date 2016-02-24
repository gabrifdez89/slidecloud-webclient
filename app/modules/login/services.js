var module = angular.module('app.modules.login.services', []);

module.factory('loginService', ['$http', function ($http) {

	return {
		login: login
	};

	function login (username, pass) {
		return $http.post(remoteServer + 'authenticate', {
			'username': username,
			'pass': pass
		});
	};
	
}]);