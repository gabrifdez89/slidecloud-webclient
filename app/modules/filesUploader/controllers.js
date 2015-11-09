var module = angular.module('app.modules.filesUploader.controllers', []);

module.controller('filesUploaderController', ['$scope', '$http', function ($scope, $http) {
    $scope.filesChanged = function (elm) {
        $scope.files = elm.files;
        $scope.$apply();
    };
    $scope.upload = function() {
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
        });
    }
}]);