var module = angular.module('app.modules.login.controllers', []);

module.controller('loginController', ['$scope', '$location', 'loginService', function ($scope, $location, loginService) {

	$scope.login = function () {
		loginService.login($scope.username, $scope.pass).then(function (response) {
			if(response.status === 200) {
				$location.path('/dashboard');
			} else {
				$location.path('/login');
			}
		});
	}
}]);