var app = angular.module('app', ['controllers']),
	remoteServer = 'http://localhost:3000';

app.controller('FilesListController', function ($scope, $http) {
	var me = this;

	$http.get(remoteServer + '/users/pepe/files').then(function (res) {
		me.files = res.data;
	});
});

app.directive('fileInput', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            elm.bind('change', function () {
                $parse(attrs.fileInput)
                .assign(scope, elm[0].files);
                scope.$apply();
            });
        }
    };
}]);

app.controller('uploader', ['$scope', '$http', function ($scope, $http) {
    $scope.filesChanged = function (elm) {
        $scope.files = elm.files;
        $scope.$apply();
    };
    $scope.upload = function() {
        var fd = new FormData();
        fd.data = [];
        angular.forEach($scope.files, function(file) {
            fd.append('file', file);
            fd.append('data', file.name);
        });
        $http.post(remoteServer + '/users/pepe/files', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function (d) {
            console.log(d);
        });
    }
}]);