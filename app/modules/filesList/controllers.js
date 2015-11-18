var module = angular.module('app.modules.filesList.controllers', []);

module.controller('filesListController', ['$scope', '$http', 'filesHandlerService', 'alertsService', function ($scope, $http, filesHandlerService, alertsService) {

    $scope.loadFilesList = function () {
        $scope.files = filesHandlerService.filesList.query( function(){}, function() {
            alertsService.insertDangerAlert('Ups... There was some error while loading your files.');
        });
    };

	$scope.delete = function(file) {
        filesHandlerService.deleteFile(file)
        .success(function (d) {
            $scope.files = filesHandlerService.filesList.query();
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

    $scope.$on('filesPosted', function () {
        $scope.loadFilesList();
    });

    $scope.loadFilesList();
}]);