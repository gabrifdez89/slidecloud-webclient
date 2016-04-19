var module = angular.module('app.modules.presentationViewer.controllers', []);

module.controller('presentationViewerController', [
    '$scope',
    '$location',
    'PDFViewerService',
    presentationViewerController
]);

function presentationViewerController ($scope, $location, pdf) {

    $scope.showFullScreenModal = showFullScreenModal;

    $scope.remoteServer = remoteServer;

    $scope.showFullScreenModal();

    function showFullScreenModal () {
        var username = $location.search().username,
            fileId = $location.search().fileId;

        $scope.fileUrl = remoteServer + 'users/' + username + '/files/' + fileId;
        $('#fullScreenModal').modal('show');
    };

    $scope.instance = pdf.Instance("viewer");

    /*$scope.nextPage = function() {
        $scope.instance.nextPage();
    };

    $scope.prevPage = function() {
        $scope.instance.prevPage();
    };

    $scope.gotoPage = function(page) {
        $scope.instance.gotoPage(page);
    };*/

    $scope.pageLoaded = function(curPage, totalPages) {
        $scope.currentPage = curPage;
        $scope.totalPages = totalPages;
    };

    $scope.loadProgress = function(loaded, total, state) {
        console.log('loaded =', loaded, 'total =', total, 'state =', state);
    };
};