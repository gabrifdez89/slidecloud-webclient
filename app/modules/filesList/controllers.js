var module = angular.module('app.modules.filesList.controllers', []);

module.controller('filesListController', ['$scope', '$http', 'filesListService', 'alertsService', function ($scope, $http, filesListService, alertsService) {

    $scope.files = filesListService.query( function(){}, function() {
        alertsService.insertDangerAlert('Ups... There was some error while loading your files.');
    });

	$scope.delete = function(file) {
        $http.delete(remoteServer + file.url)
        .success(function (d) {
            $scope.files = filesListService.query();
        })
        .error(function (d) {
            alertsService.insertDangerAlert('Ups... There was some error while deleting your file.');
        });
    };

    $scope.selectFileToDelete = function(file) {
        $scope.fileSelectedToDelete = file;
        $('#fileDeletionModal').modal('show');
    }

    $scope.deleteFile = function () {
        $scope.delete($scope.fileSelectedToDelete);
        $('#fileDeletionModal').modal('hide');
    };

}]);