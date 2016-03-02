var module = angular.module('app.modules.login.services', []);

module.factory('loginService', ['$http', loginService]);

function loginService ($http) {

	return {
		login: login,
		signin: signin
	};

	function login (username, pass) {
		return $http.post(remoteServer + 'authenticate', {
			'username': username,
			'pass': pass
		});
	};

	function signin (username, pass, email) {
		return $http.post(remoteServer + 'signin', {
			'username': username,
			'pass': pass,
			'email': email
		})
	};
};