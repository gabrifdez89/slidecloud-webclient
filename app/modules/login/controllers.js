var module = angular.module('app.modules.login.controllers', []);

module.controller('loginController', ['$scope', '$location', 'loginService', 'authService', function ($scope, $location, loginService, authService) {

	$scope.login = function () {
		loginService.login($scope.username, $scope.pass).then(function (response) {
			if(response.status === 200) {
				authService.saveToken(response.data);
				var username = authService.parseJwt(response.data).username;
				authService.saveUsername(username);
				$location.path('/dashboard');
			} else {
				$location.path('/login');
			}
		});
	}
}]);