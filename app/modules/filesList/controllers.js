var module = angular.module('app.modules.filesList.controllers', []);

module.controller('filesListController', [
    '$scope',
    '$location',
    'authService',
    'filesHandlerService',
    'alertsService',
    'filesPaginationService',
    filesListController
]);

function filesListController ($scope, $location, authService, filesHandlerService, alertsService, filesPaginationService) {

    $scope.remoteServer = remoteServer;

    $scope.loadFilesList = loadFilesList;
    $scope.goToPage = goToPage;
    $scope.goToNextPage = goToNextPage;
    $scope.goToPrevPage = goToPrevPage;
    $scope.selectFileToDelete = selectFileToDelete;
    $scope.deleteFile = deleteFile;
    $scope.token = authService.getToken();

    $scope.$on('filesPosted', $scope.loadFilesList);
    $scope.loadFilesList();

    function loadFilesList () {
        if(authService.isAuthed()) {
            $scope.files = filesHandlerService.filesList().query(onLoadFilesListSucceeded, onLoadFilesListFailed);
        } else {
            $location.path('/login');
        }
    };

    function onLoadFilesListSucceeded () {
        setPages();
    };

    function onLoadFilesListFailed () {
        alertsService.insertDangerAlert('Ups... There was some error while loading your files.');
    };

    function setPages () {
        $scope.pages = filesPaginationService.getPages($scope.files);
        $scope.numberOfPages = $scope.pages.length;
        if($scope.currentPageNumber === undefined) {
            $scope.currentPageNumber = 0;
        } else {
            $scope.currentPageNumber = $scope.currentPageNumber < $scope.numberOfPages ? $scope.currentPageNumber : $scope.currentPageNumber - 1;
        }
        $scope.currentPage = $scope.pages[$scope.currentPageNumber];
    };

    function goToPage (index) {
        $scope.currentPageNumber = index;
        $scope.currentPage = $scope.pages[$scope.currentPageNumber];
    };

    function goToNextPage () {
        if($scope.currentPageNumber < $scope.numberOfPages - 1) {
            $scope.currentPageNumber++;
            $scope.currentPage = $scope.pages[$scope.currentPageNumber];
        }
    };

    function goToPrevPage () {
        if($scope.currentPageNumber > 0) {
            $scope.currentPageNumber--;
            $scope.currentPage = $scope.pages[$scope.currentPageNumber];
        }
    };

    function selectFileToDelete (file) {
        $scope.fileSelectedToDelete = file;
        $('#fileDeletionModal').modal('show');
    };

    function deleteFile () {
        removeFile($scope.fileSelectedToDelete);
    };

    function removeFile (file) {
        if(authService.isAuthed()) {
            filesHandlerService.deleteFile(file).success(onDeleteFileSucceeded).error(onDeleteFileFailed);
            $('#fileDeletionModal').modal('hide');
        } else {
            $('#fileDeletionModal').modal('delete');
            $location.path('/login');
        }
    };

    function onDeleteFileSucceeded (d) {
        $scope.loadFilesList();
    };

    function onDeleteFileFailed (d) {
        alertsService.insertDangerAlert('Ups... There was some error while deleting your file.');
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
};