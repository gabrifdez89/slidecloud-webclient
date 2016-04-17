var module = angular.module('app.modules.fileViewer.controllers', [
	'ngPDFViewer'
]);

module.controller('fileViewerController', [
	'$scope',
	'PDFViewerService',
    fileViewerController
]);

function fileViewerController ($scope, pdf) {

	$scope.visualizeFile = visualizeFile;

	function visualizeFile (fileUrl) {
		$scope.pdfURL = fileUrl;//Need to complete this
		$scope.instance = pdf.Instance("viewer");

		$scope.nextPage = function() {
			$scope.instance.nextPage();
		};

		$scope.prevPage = function() {
			$scope.instance.prevPage();
		};

		$scope.gotoPage = function(page) {
			$scope.instance.gotoPage(page);
		};

		$scope.pageLoaded = function(curPage, totalPages) {
			$scope.currentPage = curPage;
			$scope.totalPages = totalPages;
		};

		$scope.loadProgress = function(loaded, total, state) {
			console.log('loaded =', loaded, 'total =', total, 'state =', state);
		};
	};
};
