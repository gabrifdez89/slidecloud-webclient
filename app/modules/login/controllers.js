var module = angular.module('app.modules.login.controllers', []);

module.controller('loginController', ['$scope', '$location', 'loginService', 'authService', loginController]);

function loginController ($scope, $location, loginService, authService) {

	$scope.login = login;

	function login () {
		loginService.login($scope.username, $scope.pass).then(onLoginResponse);
	};

	function onLoginResponse (response) {
		if(response.status === 200) {
			authService.saveTokenAndUsername(response.data);
			$location.path('/dashboard');
		} else {
			$location.path('/login');
		}
	};
};