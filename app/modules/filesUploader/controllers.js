var module = angular.module('app.modules.filesUploader.controllers', []);

module.controller('filesUploaderController', ['$scope', '$http', 'alertsService', function ($scope, $http, alertsService) {
    $scope.filesChanged = function (elm) {
        $scope.files = elm.files;
        $scope.$apply();
    };
    $scope.upload = function() {
        if($scope.files !== undefined) {
            var fd = new FormData();
            angular.forEach($scope.files, function(file) {
                fd.append('file', file);
                fd.append('data[]', file.name);
            });
            $http.post(remoteServer + 'users/pepe/files', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function (d) {
                console.log(d);
            }).error(function () {
                alertsService.insertDangerAlert('Ups... There was some error while uploading your file.');
            });
        } else {
            alertsService.insertWarningAlert('Remember to select at least one file.');
        }
        
    }
}]);