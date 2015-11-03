var module = angular.module('app.modules.filesList.controllers', []);

module.controller('filesListController', function ($scope, $http) {

	$http.get(remoteServer + '/users/pepe/files').then(function (res) {
		$scope.files = res.data;
	});
});