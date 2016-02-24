var module = angular.module('app.modules.filesList.controllers', []);

module.controller('filesListController', [
    '$scope',
    '$location',
    'authService',
    'filesHandlerService',
    'alertsService',
    'filesPaginationService',
    function ($scope, $location, authService, filesHandlerService, alertsService, filesPaginationService) {

    $scope.loadFilesList = function () {
        $scope.remoteServer = remoteServer;

        if(authService.isAuthed()) {
            $scope.files = filesHandlerService.filesList().query( function(){
                $scope.pages = filesPaginationService.getPages($scope.files);
                $scope.numberOfPages = $scope.pages.length;
                if($scope.currentPageNumber === undefined) {
                    $scope.currentPageNumber = 0;
                } else {
                    $scope.currentPageNumber = $scope.currentPageNumber < $scope.numberOfPages ? $scope.currentPageNumber : $scope.currentPageNumber - 1;
                }
                $scope.currentPage = $scope.pages[$scope.currentPageNumber];
            }, function() {
                alertsService.insertDangerAlert('Ups... There was some error while loading your files.');
            });
        } else {
            $location.path('/login');
        }
    };

    $scope.goToPage = function (index) {
        $scope.currentPageNumber = index;
        $scope.currentPage = $scope.pages[$scope.currentPageNumber];
    };

    $scope.goToNextPage = function () {
        if($scope.currentPageNumber < $scope.numberOfPages - 1) {
            $scope.currentPageNumber++;
            $scope.currentPage = $scope.pages[$scope.currentPageNumber];
        }
    };

    $scope.goToPrevPage = function () {
        if($scope.currentPageNumber > 0) {
            $scope.currentPageNumber--;
            $scope.currentPage = $scope.pages[$scope.currentPageNumber];
        }
    };

	$scope.delete = function(file) {
        if(authService.isAuthed()) {
            filesHandlerService.deleteFile(file)
            .success(function (d) {
                $scope.loadFilesList();
            })
            .error(function (d) {
                alertsService.insertDangerAlert('Ups... There was some error while deleting your file.');
            });
            $('#fileDeletionModal').modal('hide');
        } else {
            $('#fileDeletionModal').modal('delete');
            $location.path('/login');
        }
    };

    $scope.selectFileToDelete = function(file) {
        $scope.fileSelectedToDelete = file;
        $('#fileDeletionModal').modal('show');
    }

    $scope.deleteFile = function () {
        $scope.delete($scope.fileSelectedToDelete);
    };

    /*$scope.download = function (file) {
        filesHandlerService.downloadFile(file)
        .success(function (downloadedFile) {
            console.log('Successfully loaded data:\n' + downloadedFile);
        })
        .error(function (error) {
            alertsService.insertDangerAlert('Ups... There was some error while downloading your file.');
        });
    }*/

    $scope.$on('filesPosted', function () {
        $scope.loadFilesList();
    });

    $scope.loadFilesList();
}]);