var module = angular.module('app.modules.filesUploader.directives', []);

module.directive('fileInput', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: link
    };

    var link = function (scope, elm, attrs) {
        elm.bind('change', function () {
            $parse(attrs.fileInput)
            .assign(scope, elm[0].files);
            scope.$apply();
        });
    };
}]);