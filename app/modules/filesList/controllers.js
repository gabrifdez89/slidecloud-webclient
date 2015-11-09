var module = angular.module('app.modules.filesList.controllers', []);

module.controller('filesListController', function ($scope, $http) {

	$http.get(remoteServer + 'users/pepe/files').then(function (res) {
		$scope.files = res.data;
	});

	$scope.delete = function(file) {
        $http.delete(remoteServer + file.url)
        .success(function (d) {
            console.log(d);
        })
        .error(function (d) {
        	console.log(d);
        });
    }
});