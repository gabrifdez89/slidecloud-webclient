var module = angular.module('app.modules.filesPagination.services', []),
	filesPerPage = 8;


module.factory('filesPaginationService', [filesPaginationService]);

function filesPaginationService () {
	
	return {
		getPages: getPages
	};

	function getPages (files) {
		var numberOfPages = Math.ceil(files.length / filesPerPage),
			pages = [],
			filesInAPage;

		for (var i = 0 ; i< numberOfPages; i++) {
			filesInAPage = files.slice(i*filesPerPage, i*filesPerPage + filesPerPage);
			pages.push(filesInAPage);
		}

		return pages;
	};
};