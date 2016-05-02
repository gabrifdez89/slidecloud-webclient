var module = angular.module('app.modules.presentationViewer.controllers', []);

module.controller('presentationViewerController', [
    '$scope',
    '$location',
    'socketIOService',
    'PDFViewerService',
    presentationViewerController
]);

function presentationViewerController ($scope, $location, socketIOService, pdf) {

    $scope.showFullScreenModal = showFullScreenModal;

    $scope.remoteServer = remoteServer;

    $scope.showFullScreenModal();

    function showFullScreenModal () {
        var username = $location.search().username,
            fileId = $location.search().fileId,
            filePartialUrl = 'users/' + username + '/files/' + fileId;

        $scope.fileUrl = remoteServer + filePartialUrl;
        socketIOService.connectToNamespace(filePartialUrl);
        socketIOService.onGoToPage(goToPage);
        $('#fullScreenModal').modal('show');
    };

    $scope.instance = pdf.Instance("viewer");

    function goToPage (pageNum) {
        $scope.instance.gotoPage(pageNum);
    };

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