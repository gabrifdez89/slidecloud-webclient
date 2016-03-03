var module = angular.module('app.modules.login.services', []);

module.factory('loginService', ['$http', loginService]);

function loginService ($http) {

	return {
		login: login,
		signin: signin,
		validateAccount: validateAccount,
		requestValidationEmail: requestValidationEmail
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

	function validateAccount (username, token) {
		return $http.post(remoteServer + 'validate', {
			'username': username,
			'token': token
		})
	};

	function requestValidationEmail (username, pass) {
		return $http.post(remoteServer + 'requestvalidationemail', {
			'username': username,
			'pass': pass
		});
	}
};