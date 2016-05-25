var module = angular.module('app.modules.presentation.controllers', []);

module.controller('presentationController', [
    '$scope',
    'presentationService',
    'alertsService',
    'socketIOService',
    'PDFViewerService',
    presentationController]);

function presentationController ($scope, presentationService, alertsService, socketIOService, pdf) {

    $scope.$on('presentationStarted', function () {
        if($scope.instance) {//Force rendering of first page if the pdf has been rendered before
            $scope.instance.gotoPage(1);
        }
        var namespace;
        $scope.visualizedFile = presentationService.getVisualizedFile();
        $scope.fileUrl = presentationService.getFileUrl();
        $scope.instance = pdf.Instance("viewer");
        $('#fullScreenModal').modal('show');
        namespace = $scope.visualizedFile.url;
        socketIOService.createNamespace(namespace);
        socketIOService.onNamespaceCreated(socketIOService.connectToNamespace);
    });

    $scope.nextPage = nextPage;
    $scope.prevPage = prevPage;
    $scope.showLink = showLink;
    $scope.deletePresentation = deletePresentation;

    function nextPage () {
        $scope.instance.nextPage();
        socketIOService.goToPage(presentationService.getPageNum());
    };

    function prevPage () {
        $scope.instance.prevPage();
        socketIOService.goToPage(presentationService.getPageNum());
    };

    function showLink () {
        $scope.link = presentationService.getPresentationLink();
        $('#showLinkModal').modal('show');
    };

    /*$scope.gotoPage = function(page) {
        $scope.instance.gotoPage(page);
    };*/

    /*$scope.pageLoaded = function(curPage, totalPages) {
        $scope.currentPage = curPage;
        $scope.totalPages = totalPages;
    };*/

    $scope.loadProgress = function(loaded, total, state) {
        console.log('loaded =', loaded, 'total =', total, 'state =', state);
    };

    function deletePresentation () {
        presentationService.deletePresentation($scope.visualizedFile.url)
        .success(onDeletePresentationSucceeded)
        .error(onDeletePresentationFailed);
    };

    function onDeletePresentationSucceeded (response) {
        alertsService.insertWarningAlert('Presentation finished successfully');
    };

    function onDeletePresentationFailed () {
        alertsService.insertDangerAlert('Ups... There was some error finishing presentation...');
    };
};