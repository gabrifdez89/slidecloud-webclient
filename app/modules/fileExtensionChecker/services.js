var module = angular.module('app.modules.fileExtensionChecker.services', []);

module.factory('fileExtensionCheckerService', [fileExtensionCheckerService]);

function fileExtensionCheckerService () {

	return {
		isPdfFile: isPdfFile
	};

	function isPdfFile (fileName) {
		return fileName.slice(fileName.length - 4, fileName.length) === '.pdf';
	};
};