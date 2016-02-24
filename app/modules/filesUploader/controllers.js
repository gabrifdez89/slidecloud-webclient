var module = angular.module('app.modules.filesUploader.controllers', []);

module.controller('filesUploaderController', ['$scope', '$rootScope', '$http', 'alertsService', 'filesHandlerService', filesUploaderController]);

function filesUploaderController ($scope, $rootScope, $http, alertsService, filesHandlerService) {
    $scope.filesChanged = function (elm) {
        $scope.files = elm.files;
        $scope.$apply();
    };
    $scope.upload = function() {
        if($scope.files !== undefined) {
            var fd = createFormData();
            filesHandlerService.postFiles(fd).then(function (resonse) {
                $rootScope.$broadcast('filesPosted');
                $scope.files = undefined;
            }, function (response) {
                if(response.status === 400) {
                    alertsService.insertDangerAlert('You already have some file with that name.');
                } else {
                    alertsService.insertDangerAlert('Ups... There was some error while uploading your file.');
                }
            });
        } else {
            alertsService.insertWarningAlert('Remember to select at least one file.');
        }
    };

    function createFormData () {
        var fd = new FormData();
        angular.forEach($scope.files, function(file) {
            fd.append('file', file);
            fd.append('data[]', file.name);
        });
        return fd;
    };
};